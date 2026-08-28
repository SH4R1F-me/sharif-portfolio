import type { Skill } from "./types";
import { publishedOnly } from "./types";

const published = "published" as const;

const allSkills: Skill[] = [
  {
    id: "server-administration",
    name: "Windows Server · Ubuntu Server",
    category: "Infrastructure & Hardware",
    plainDescription:
      "Server deployment, administration, and operational troubleshooting.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "virtualization",
    name: "VMware · VirtualBox",
    category: "Infrastructure & Hardware",
    plainDescription:
      "Virtualized environments for services, testing, and security labs.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "surveillance",
    name: "CCTV · DVR/NVR · PoE",
    category: "Infrastructure & Hardware",
    plainDescription:
      "Installation, connectivity, monitoring, and maintenance of surveillance systems.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "network-foundations",
    name: "TCP/IP · Subnetting · DHCP",
    category: "Enterprise Networking",
    plainDescription:
      "Addressing, segmentation, and core network-service fundamentals.",
    relatedProjectSlugs: ["spi-network-simulation"],
    status: published,
  },
  {
    id: "routing-switching",
    name: "Routing · Switching · VLANs",
    category: "Enterprise Networking",
    plainDescription:
      "Layer 2/3 connectivity, traffic separation, and path troubleshooting.",
    relatedProjectSlugs: ["spi-network-simulation"],
    status: published,
  },
  {
    id: "network-platforms",
    name: "Cisco · MikroTik RouterOS",
    category: "Enterprise Networking",
    plainDescription:
      "Configuration and simulation across Cisco and MikroTik environments.",
    relatedProjectSlugs: ["spi-network-simulation"],
    status: published,
  },
  {
    id: "rf-monitoring",
    name: "RF Support · Network Monitoring",
    category: "Enterprise Networking",
    plainDescription:
      "Signal-quality analysis, connectivity triage, and performance monitoring.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "scripting",
    name: "Python · Bash · SQL",
    category: "Development & Automation",
    plainDescription:
      "Scripting, data handling, and repeatable system workflows.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "full-stack-platforms",
    name: "Next.js · NestJS · JavaScript",
    category: "Development & Automation",
    plainDescription:
      "Full-stack foundations for self-hosted and database-driven prototypes.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "linux-automation",
    name: "Linux Automation · Cloudflare Tunnels",
    category: "Development & Automation",
    plainDescription:
      "Deployment-oriented automation and secure remote connectivity patterns.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "data-platforms",
    name: "PostgreSQL · Supabase",
    category: "Development & Automation",
    plainDescription:
      "Relational data and access-control foundations for application prototypes.",
    relatedProjectSlugs: ["noorix-stream"],
    status: published,
  },
  {
    id: "vapt",
    name: "Vulnerability Assessment · VAPT",
    category: "Monitoring & Security",
    plainDescription:
      "Structured discovery, validation, prioritization, and reporting of risk.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "penetration-testing",
    name: "Penetration-Testing Methodology",
    category: "Monitoring & Security",
    plainDescription:
      "Authorized, lab-driven assessment across Linux, Windows, and web targets.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "security-analysis",
    name: "Threat Analysis · OSINT · Forensics",
    category: "Monitoring & Security",
    plainDescription:
      "Evidence-led investigation and foundational defensive analysis workflows.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "network-security",
    name: "Firewalls · Network Hardening",
    category: "Monitoring & Security",
    plainDescription:
      "Access control, traffic restriction, and security-aware network design.",
    relatedProjectSlugs: ["spi-network-simulation"],
    status: published,
  },
  {
    id: "security-platforms",
    name: "Kali Linux · WSL",
    category: "Monitoring & Security",
    plainDescription:
      "Security lab environments, Linux tooling, and Windows integration workflows.",
    relatedProjectSlugs: [],
    status: published,
  },
  {
    id: "service-operations",
    name: "Continuous Monitoring · Incident Tickets",
    category: "Monitoring & Security",
    plainDescription:
      "Traceable alert, incident, and operational communication workflows.",
    relatedProjectSlugs: [],
    status: published,
  },
];

export const skills = publishedOnly(allSkills);
export const skillCategories = [
  "Infrastructure & Hardware",
  "Enterprise Networking",
  "Development & Automation",
  "Monitoring & Security",
];
