import type { Project } from "./types";
import { publishedOnly } from "./types";

const allProjects: Project[] = [
  {
    slug: "noorix-stream",
    title: "Noorix Stream",
    category: "CCTV · Edge Analytics",
    summary:
      "An AI-assisted, multi-tenant monitoring concept connecting CCTV operations with edge-based event intelligence.",
    problem:
      "Turn distributed video feeds and detection events into actionable, tenant-specific monitoring workflows.",
    role: "Product systems designer and prototype architect",
    approach: [
      "Defined workflows for facial tracking, plate recognition, human/fire detection, and automated snapshots.",
      "Planned Linux automation, Cloudflare tunnels, DDNS, and English, Bangla, and Arabic interfaces.",
    ],
    tools: ["Linux", "Bash", "Cloudflare Tunnels", "DDNS", "Edge AI"],
    outcomes: [
      "Produced a backend-first architecture and operational workflow prototype.",
    ],
    coverImage: "/assets/brand/og-image.webp",
    status: "published",
    featured: true,
  },
  {
    slug: "spi-network-simulation",
    title: "Institutional Network Simulation",
    category: "Cisco Packet Tracer",
    summary:
      "A structured campus-network simulation for Shariatpur Polytechnic Institute with routed connectivity and core controls.",
    problem:
      "Model a clear, supportable network for an educational environment.",
    role: "Network designer",
    approach: [
      "Designed IP addressing and router/switch topology.",
      "Validated end-to-end connectivity and documented troubleshooting scenarios.",
    ],
    tools: ["Cisco Packet Tracer", "TCP/IP", "Routing", "Switching"],
    outcomes: [
      "Delivered a tested network model with documented fault scenarios.",
    ],
    coverImage: "/assets/brand/og-image.webp",
    status: "published",
    featured: true,
  },
];

export const projects = publishedOnly(allProjects);
export const featuredProjects = projects.filter((project) => project.featured);
