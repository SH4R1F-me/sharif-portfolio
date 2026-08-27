// HeroScene.ts — Three.js procedural hero scene
// Runs as a client-side module, lazy-loaded only when WebGL is available
// and Lite Mode is disabled.

import * as THREE from 'three';

let renderer: THREE.WebGLRenderer | null = null;
let animationId: number | null = null;
let isVisible = true;

export function initHeroScene(container: HTMLElement): void {
  // Clean up any existing scene
  cleanup();

  // ── Renderer ──
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  renderer = new THREE.WebGLRenderer({
    antialias: dpr < 1.5,
    alpha: true,
    powerPreference: 'default',
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Scene ──
  const scene = new THREE.Scene();

  // ── Camera ──
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 5);

  // ── Lights ──
  const ambientLight = new THREE.AmbientLight(0x111a26, 1);
  scene.add(ambientLight);

  // Cyan rim light
  const cyanLight = new THREE.PointLight(0x00e5ff, 3, 8);
  cyanLight.position.set(-2, 1, 2);
  scene.add(cyanLight);

  // Gold key light
  const goldLight = new THREE.PointLight(0xd7a84b, 1, 8);
  goldLight.position.set(2, 2, 1);
  scene.add(goldLight);

  // ── Shield geometry (procedural hexagonal prism) ──
  const shieldGroup = new THREE.Group();
  scene.add(shieldGroup);

  // Shield body — extruded pentagon-like shape
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 1.4);
  shieldShape.lineTo(1, 0.8);
  shieldShape.lineTo(1, -0.2);
  shieldShape.quadraticCurveTo(1, -1.2, 0, -1.6);
  shieldShape.quadraticCurveTo(-1, -1.2, -1, -0.2);
  shieldShape.lineTo(-1, 0.8);
  shieldShape.lineTo(0, 1.4);

  const extrudeSettings = {
    depth: 0.25,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 3,
  };

  const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0x0b111a,
    emissive: 0x001a26,
    metalness: 0.9,
    roughness: 0.2,
  });

  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.position.z = -0.12;
  shieldGroup.add(shieldMesh);

  // Edge glow overlay
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 0.5,
    metalness: 1,
    roughness: 0,
    wireframe: false,
    transparent: true,
    opacity: 0.15,
  });
  const edgeMesh = new THREE.Mesh(shieldGeo, edgeMat);
  edgeMesh.position.z = -0.12;
  shieldGroup.add(edgeMesh);

  // ── Orbital rings ──
  const ringGeometry1 = new THREE.RingGeometry(1.8, 1.84, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  });
  const ring1 = new THREE.Mesh(ringGeometry1, ringMat1);
  ring1.rotation.x = Math.PI / 2.5;
  scene.add(ring1);

  const ringGeometry2 = new THREE.RingGeometry(2.5, 2.53, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xd7a84b,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const ring2 = new THREE.Mesh(ringGeometry2, ringMat2);
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.z = Math.PI / 6;
  scene.add(ring2);

  // ── Network nodes ──
  const nodes: THREE.Mesh[] = [];
  const nodePositions = [
    [-1.5, 0.8, 0.5],
    [1.4, 0.6, 0.2],
    [1.6, -0.6, 0.3],
    [-1.4, -0.8, 0.1],
    [0.3, 1.8, 0.4],
    [-0.4, -1.9, 0.2],
  ];

  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);

  nodePositions.forEach(([x, y, z]) => {
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, y, z);
    scene.add(node);
    nodes.push(node);
  });

  // ── Depth particles ──
  const particleCount = 40;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 0.03,
    transparent: true,
    opacity: 0.3,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse parallax ──
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const onMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.08; // max ~4.6° rotation
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * -0.08;
  };

  container.addEventListener('mousemove', onMouseMove);

  // ── Resize ──
  const onResize = () => {
    if (!renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  window.addEventListener('resize', onResize);

  // ── Visibility pause ──
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => { isVisible = entry.isIntersecting; },
    { threshold: 0 }
  );
  visibilityObserver.observe(container);

  const onVisChange = () => { isVisible = document.visibilityState === 'visible'; };
  document.addEventListener('visibilitychange', onVisChange);

  // ── Animate ──
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    if (!isVisible || !renderer) return;

    const t = clock.getElapsedTime();

    // Smooth mouse follow
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    shieldGroup.rotation.y = currentX;
    shieldGroup.rotation.x = currentY;

    // Slow idle
    shieldGroup.rotation.y += Math.sin(t * 0.3) * 0.002;
    ring1.rotation.z = t * 0.08;
    ring2.rotation.z = -t * 0.05;

    // Node pulsing
    nodes.forEach((node, i) => {
      const s = 0.8 + 0.3 * Math.sin(t * 1.5 + i * 0.9);
      node.scale.setScalar(s);
    });

    particles.rotation.y = t * 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Show container (fade in over poster)
  container.style.opacity = '1';
  container.style.transition = 'opacity 800ms ease';

  // Store cleanup on container for external use
  (container as HTMLElement & { _smCleanup?: () => void })._smCleanup = () => {
    container.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisChange);
    visibilityObserver.disconnect();
    cleanup();
  };
}

function cleanup() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (renderer) {
    renderer.dispose();
    renderer.domElement?.remove();
    renderer = null;
  }
}
