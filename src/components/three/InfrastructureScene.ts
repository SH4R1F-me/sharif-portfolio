import * as THREE from "three";

type DisposableMaterial = THREE.Material | THREE.Material[];

interface AnimatedLed {
  mesh: THREE.Mesh;
  phase: number;
  speed: number;
}

interface DataPacket {
  mesh: THREE.Mesh;
  curve: THREE.CatmullRomCurve3;
  phase: number;
  speed: number;
}

interface SceneController {
  destroy: () => void;
}

const GREEN = 0x39ff14;
const GREEN_SOFT = 0x89ff76;
const DARK = 0x070807;
const PANEL = 0x111511;
const METAL = 0x1b211c;

const cameraStops = [0, 2.8, 9.2, 16.2, 23.2, 23.8];

function disposeMaterial(material: DisposableMaterial) {
  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (value instanceof THREE.Texture) value.dispose();
    });
    item.dispose();
  });
}

function box(
  size: [number, number, number],
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0],
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  return mesh;
}

function createRack(animatedLeds: AnimatedLed[]) {
  const rack = new THREE.Group();
  rack.name = "enterprise-rack";

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: METAL,
    metalness: 0.92,
    roughness: 0.22,
  });
  const serverMaterial = new THREE.MeshStandardMaterial({
    color: PANEL,
    metalness: 0.72,
    roughness: 0.34,
  });
  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0x080b08,
    metalness: 0.45,
    roughness: 0.58,
  });
  const greenMaterial = new THREE.MeshBasicMaterial({ color: GREEN });
  const portMaterial = new THREE.MeshStandardMaterial({
    color: 0x263028,
    emissive: 0x071208,
    metalness: 0.65,
    roughness: 0.3,
  });

  [-1.75, 1.75].forEach((x) => {
    [-0.75, 0.75].forEach((z) => {
      rack.add(box([0.15, 6.6, 0.15], frameMaterial, [x, 0, z]));
    });
  });
  rack.add(box([3.65, 0.16, 1.65], frameMaterial, [0, 3.28, 0]));
  rack.add(box([3.65, 0.16, 1.65], frameMaterial, [0, -3.28, 0]));

  for (let row = 0; row < 8; row += 1) {
    const y = 2.62 - row * 0.74;
    const server = box([3.25, 0.58, 1.4], serverMaterial, [0, y, 0]);
    rack.add(server);
    rack.add(box([3.08, 0.42, 0.05], faceMaterial, [0, y, 0.73]));

    for (let vent = 0; vent < 12; vent += 1) {
      rack.add(
        box([0.06, 0.22, 0.035], portMaterial, [-1.2 + vent * 0.16, y, 0.77]),
      );
    }

    for (let drive = 0; drive < 4; drive += 1) {
      rack.add(
        box([0.22, 0.3, 0.04], portMaterial, [0.55 + drive * 0.32, y, 0.77]),
      );
    }

    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 8),
      greenMaterial.clone(),
    );
    led.position.set(1.42, y, 0.79);
    rack.add(led);
    animatedLeds.push({
      mesh: led,
      phase: row * 0.78,
      speed: 1.5 + (row % 3) * 0.45,
    });
  }

  const sfpPanel = box([2.65, 0.34, 0.08], faceMaterial, [0, -2.92, 0.76]);
  rack.add(sfpPanel);
  for (let port = 0; port < 8; port += 1) {
    const sfp = box([0.2, 0.13, 0.05], portMaterial, [
      -0.92 + port * 0.27,
      -2.92,
      0.82,
    ]);
    rack.add(sfp);
    if (port % 2 === 0) {
      const led = box([0.04, 0.035, 0.03], greenMaterial.clone(), [
        -0.92 + port * 0.27,
        -2.72,
        0.82,
      ]);
      rack.add(led);
      animatedLeds.push({ mesh: led, phase: port, speed: 2.1 });
    }
  }

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, 0.025, 8, 96),
    new THREE.MeshBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -3.15;
  rack.add(halo);

  rack.rotation.y = -0.28;
  return rack;
}

function createNetworkZone(animatedLeds: AnimatedLed[], packets: DataPacket[]) {
  const network = new THREE.Group();
  network.name = "network-fabric";

  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: 0x121713,
    metalness: 0.86,
    roughness: 0.28,
  });
  const portMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0d0a,
    metalness: 0.7,
    roughness: 0.42,
  });
  const ledMaterial = new THREE.MeshBasicMaterial({ color: GREEN });

  const switchGroup = new THREE.Group();
  switchGroup.add(box([5.4, 0.72, 1.8], chassisMaterial));
  switchGroup.add(box([5.12, 0.5, 0.05], portMaterial, [0, 0, 0.93]));

  for (let port = 0; port < 20; port += 1) {
    const x = -2.25 + (port % 10) * 0.5;
    const y = port < 10 ? 0.15 : -0.17;
    switchGroup.add(box([0.3, 0.18, 0.04], portMaterial, [x, y, 0.98]));
    const led = box([0.045, 0.035, 0.03], ledMaterial.clone(), [
      x + 0.12,
      y + 0.12,
      1.01,
    ]);
    switchGroup.add(led);
    animatedLeds.push({
      mesh: led,
      phase: port * 0.38,
      speed: 2.3 + (port % 4) * 0.35,
    });
  }

  switchGroup.position.set(0, 0.25, 0);
  switchGroup.rotation.y = 0.18;
  network.add(switchGroup);

  const endpoints = [
    new THREE.Vector3(-3.5, 2.5, -0.8),
    new THREE.Vector3(-3.7, -2.1, 0.1),
    new THREE.Vector3(3.4, 2.45, -0.3),
    new THREE.Vector3(3.7, -2.2, -0.7),
    new THREE.Vector3(0.4, 3.05, -1.4),
  ];

  endpoints.forEach((endpoint, index) => {
    const start = new THREE.Vector3(-1.8 + index * 0.9, 0.25, 0.95);
    const curve = new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3(start.x * 0.8, 0.7 + (index % 2) * 0.9, 0.2),
      new THREE.Vector3(endpoint.x * 0.65, endpoint.y * 0.7, -0.15),
      endpoint,
    ]);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 56, 0.018, 6, false),
      new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? GREEN : GREEN_SOFT,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
      }),
    );
    network.add(tube);

    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 10, 10),
      new THREE.MeshBasicMaterial({ color: GREEN }),
    );
    network.add(packet);
    packets.push({
      mesh: packet,
      curve,
      phase: index * 0.19,
      speed: 0.075 + index * 0.008,
    });

    const node = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.MeshStandardMaterial({
        color: 0x101510,
        emissive: GREEN,
        emissiveIntensity: 0.42,
        metalness: 0.65,
        roughness: 0.22,
      }),
    );
    node.position.copy(endpoint);
    network.add(node);
  });

  return network;
}

function createDevelopmentZone() {
  const development = new THREE.Group();
  development.name = "development-ai";

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x121612,
    metalness: 0.78,
    roughness: 0.26,
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0a130a,
    emissive: 0x0b2d07,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.48,
    roughness: 0.18,
    metalness: 0.1,
    transmission: 0.08,
    side: THREE.DoubleSide,
  });
  const lineMaterial = new THREE.MeshBasicMaterial({
    color: GREEN,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
  });
  const mutedLineMaterial = new THREE.MeshBasicMaterial({
    color: 0x60705f,
    transparent: true,
    opacity: 0.38,
  });

  const terminal = new THREE.Group();
  terminal.add(box([5.8, 3.65, 0.13], frameMaterial));
  terminal.add(box([5.48, 3.32, 0.08], glassMaterial, [0, 0, 0.11]));
  terminal.add(box([5.48, 0.06, 0.04], lineMaterial, [0, 1.4, 0.17]));

  const rows = [2.5, 3.7, 2.1, 4.2, 3.15, 1.75, 3.8, 2.7, 4.45];
  rows.forEach((width, index) => {
    const material =
      index < 3 || index === 6 ? lineMaterial : mutedLineMaterial;
    terminal.add(
      box([width, 0.055, 0.035], material, [
        -2.3 + width / 2,
        0.95 - index * 0.25,
        0.18,
      ]),
    );
  });

  for (let column = 0; column < 3; column += 1) {
    terminal.add(
      box([1.45, 0.55, 0.035], glassMaterial, [
        -1.7 + column * 1.72,
        -1.2,
        0.18,
      ]),
    );
    for (let row = 0; row < 3; row += 1) {
      terminal.add(
        box([0.9 - row * 0.14, 0.035, 0.02], lineMaterial, [
          -1.96 + column * 1.72,
          -1.06 - row * 0.13,
          0.22,
        ]),
      );
    }
  }

  terminal.rotation.y = -0.22;
  development.add(terminal);

  const aiCore = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.78, 1),
    new THREE.MeshStandardMaterial({
      color: 0x0b120b,
      emissive: GREEN,
      emissiveIntensity: 0.65,
      wireframe: true,
      transparent: true,
      opacity: 0.82,
    }),
  );
  aiCore.add(core);
  [1.15, 1.45, 1.78].forEach((radius, index) => {
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.018, 8, 72),
      new THREE.MeshBasicMaterial({
        color: index === 1 ? GREEN_SOFT : GREEN,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
      }),
    );
    orbit.rotation.set(index * 0.7, index * 0.9, index * 0.4);
    aiCore.add(orbit);
  });
  aiCore.position.set(3.7, 0.25, -0.2);
  aiCore.userData.core = core;
  development.add(aiCore);

  return { group: development, aiCore };
}

function createMonitoringZone() {
  const monitoring = new THREE.Group();
  monitoring.name = "central-monitoring";

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x151a15,
    metalness: 0.82,
    roughness: 0.24,
  });
  const screenMaterials: THREE.MeshStandardMaterial[] = [];
  const screens = new THREE.Group();

  for (let row = 0; row < 2; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x081008,
        emissive: row === 0 ? 0x123d0b : 0x0b2a08,
        emissiveIntensity: 0.5,
        metalness: 0.08,
        roughness: 0.34,
      });
      screenMaterials.push(screenMaterial);
      const x = (column - 1) * 2.35;
      const y = row === 0 ? 1.35 : -1.05;
      screens.add(box([2.14, 1.72, 0.15], frameMaterial, [x, y, 0]));
      screens.add(box([1.94, 1.5, 0.06], screenMaterial, [x, y, 0.11]));

      const routeMaterial = new THREE.MeshBasicMaterial({
        color: GREEN,
        transparent: true,
        opacity: 0.42,
      });
      screens.add(box([1.35, 0.025, 0.02], routeMaterial, [x, y + 0.35, 0.16]));
      screens.add(
        box([0.85, 0.025, 0.02], routeMaterial, [x - 0.23, y + 0.05, 0.16]),
      );
      screens.add(
        box([1.12, 0.025, 0.02], routeMaterial, [x + 0.08, y - 0.28, 0.16]),
      );

      const reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.17, 0.185, 32),
        new THREE.MeshBasicMaterial({
          color: GREEN,
          transparent: true,
          opacity: 0.56,
          side: THREE.DoubleSide,
        }),
      );
      reticle.position.set(x + 0.48, y + 0.08, 0.17);
      screens.add(reticle);
    }
  }

  screens.rotation.y = 0.18;
  monitoring.add(screens);

  const consoleMaterial = new THREE.MeshStandardMaterial({
    color: 0x111611,
    metalness: 0.65,
    roughness: 0.36,
  });
  const console = box([5.5, 0.55, 2.2], consoleMaterial, [0, -2.75, 1.2]);
  console.rotation.x = -0.12;
  monitoring.add(console);

  return { group: monitoring, screenMaterials };
}

function createAtmosphere() {
  const particles = 180;
  const positions = new Float32Array(particles * 3);
  for (let index = 0; index < particles; index += 1) {
    positions[index * 3] = Math.random() * 34 - 5;
    positions[index * 3 + 1] = Math.random() * 11 - 5;
    positions[index * 3 + 2] = Math.random() * 12 - 6;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: GREEN,
    size: 0.025,
    transparent: true,
    opacity: 0.23,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

function getSceneProgress(sections: HTMLElement[]) {
  if (sections.length === 0) return 0;
  const viewportCenter = window.scrollY + window.innerHeight * 0.5;

  for (let index = 0; index < sections.length - 1; index += 1) {
    const current = sections[index];
    const next = sections[index + 1];
    const start = current.offsetTop + current.offsetHeight * 0.42;
    const end = next.offsetTop + next.offsetHeight * 0.42;
    if (viewportCenter <= end) {
      const local = THREE.MathUtils.clamp(
        (viewportCenter - start) / Math.max(1, end - start),
        0,
        1,
      );
      return index + local;
    }
  }

  return sections.length - 1;
}

export function createInfrastructureScene(
  container: HTMLElement,
): SceneController {
  const scene = new THREE.Scene();
  scene.background = null;
  scene.fog = new THREE.FogExp2(DARK, 0.034);

  const renderer = new THREE.WebGLRenderer({
    antialias: window.devicePixelRatio < 1.6,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.1 : 1.5),
  );
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.setClearColor(DARK, 0);
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    44,
    container.clientWidth / container.clientHeight,
    0.1,
    120,
  );
  camera.position.set(4.9, 1.2, 8.6);

  const world = new THREE.Group();
  scene.add(world);

  const animatedLeds: AnimatedLed[] = [];
  const packets: DataPacket[] = [];
  const rack = createRack(animatedLeds);
  rack.position.set(0, 0, 0);
  world.add(rack);

  const network = createNetworkZone(animatedLeds, packets);
  network.position.set(9.2, -0.15, 0);
  world.add(network);

  const development = createDevelopmentZone();
  development.group.position.set(16.2, 0.1, 0);
  world.add(development.group);

  const monitoring = createMonitoringZone();
  monitoring.group.position.set(23.2, 0.15, 0);
  world.add(monitoring.group);

  const floor = new THREE.GridHelper(48, 96, GREEN, 0x152017);
  floor.position.set(11, -3.36, 0);
  const floorMaterials = Array.isArray(floor.material)
    ? floor.material
    : [floor.material];
  floorMaterials.forEach((material) => {
    material.transparent = true;
    material.opacity = 0.16;
  });
  scene.add(floor);

  const atmosphere = createAtmosphere();
  scene.add(atmosphere);

  scene.add(new THREE.AmbientLight(0xb5ffad, 0.17));
  const keyLight = new THREE.DirectionalLight(0xe9ffe5, 1.05);
  keyLight.position.set(4, 8, 7);
  scene.add(keyLight);

  [0, 9.2, 16.2, 23.2].forEach((x, index) => {
    const light = new THREE.PointLight(
      index === 2 ? GREEN_SOFT : GREEN,
      7,
      11,
      2.1,
    );
    light.position.set(x, 2.6, 3.1);
    scene.add(light);
  });

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-scene-index]"),
  );
  let targetStage = getSceneProgress(sections);
  let currentStage = targetStage;
  let mouseX = 0;
  let mouseY = 0;
  let isVisible = document.visibilityState === "visible";
  let frameId = 0;
  let destroyed = false;

  const onScroll = () => {
    targetStage = getSceneProgress(sections);
  };

  const onPointerMove = (event: PointerEvent) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const onResize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.1 : 1.5),
    );
    renderer.setSize(width, height, false);
  };

  const onVisibilityChange = () => {
    isVisible = document.visibilityState === "visible";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  const clock = new THREE.Clock();
  const lookTarget = new THREE.Vector3();

  const render = () => {
    if (destroyed) return;
    frameId = requestAnimationFrame(render);
    if (!isVisible) return;

    const elapsed = clock.getElapsedTime();
    currentStage = THREE.MathUtils.lerp(currentStage, targetStage, 0.055);

    const lower = Math.floor(
      THREE.MathUtils.clamp(currentStage, 0, cameraStops.length - 1),
    );
    const upper = Math.min(cameraStops.length - 1, lower + 1);
    const blend = currentStage - lower;
    const sceneX = THREE.MathUtils.lerp(
      cameraStops[lower],
      cameraStops[upper],
      blend,
    );

    const compact = window.innerWidth < 900;
    const cameraOffsetX = compact ? 0.8 : 4.65;
    const cameraZ = compact ? 11.6 : 8.7;
    const targetCameraX = sceneX + cameraOffsetX + mouseX * 0.12;
    const targetCameraY =
      0.85 - mouseY * 0.12 + Math.sin(currentStage * Math.PI) * 0.22;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetCameraX,
      0.065,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetCameraY,
      0.065,
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.065);
    lookTarget.set(sceneX, -0.05, 0);
    camera.lookAt(lookTarget);

    rack.rotation.y = -0.28 + Math.sin(elapsed * 0.22) * 0.035;
    network.rotation.y = Math.sin(elapsed * 0.18) * 0.025;
    development.aiCore.rotation.y = elapsed * 0.24;
    development.aiCore.rotation.x = Math.sin(elapsed * 0.31) * 0.16;
    monitoring.group.rotation.y = Math.sin(elapsed * 0.16) * 0.018;

    animatedLeds.forEach(({ mesh, phase, speed }) => {
      const pulse =
        0.32 + Math.max(0, Math.sin(elapsed * speed + phase)) * 0.68;
      mesh.scale.setScalar(0.8 + pulse * 0.48);
      const material = mesh.material as THREE.Material & {
        opacity?: number;
        transparent?: boolean;
      };
      material.transparent = true;
      material.opacity = pulse;
    });

    packets.forEach(({ mesh, curve, phase, speed }) => {
      const progress = (elapsed * speed + phase) % 1;
      mesh.position.copy(curve.getPointAt(progress));
      mesh.scale.setScalar(0.72 + Math.sin(progress * Math.PI) * 0.72);
    });

    monitoring.screenMaterials.forEach((material, index) => {
      material.emissiveIntensity =
        0.35 + Math.sin(elapsed * 0.9 + index * 0.72) * 0.08;
    });

    atmosphere.rotation.y = elapsed * 0.004;
    renderer.render(scene, camera);
  };

  onResize();
  onScroll();
  render();

  return {
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((object) => {
        if (!(
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ))
          return;
        object.geometry?.dispose();
        if (object.material) disposeMaterial(object.material);
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
