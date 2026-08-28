import type { Experience } from "./types";
import { publishedOnly } from "./types";

const allExperience: Experience[] = [
  {
    organization: "High-End Protection Foundation for Security Monitoring",
    role: "Network Operator",
    startDate: "2025-08",
    location: "Makkah, Saudi Arabia",
    bullets: [
      "Maintain CCTV, motion-detection, and thermal-detection systems supporting active security operations.",
      "Configure and troubleshoot the network paths behind surveillance services, endpoints, and remote access.",
      "Resolve hardware, software, and connectivity tickets while monitoring service health and security signals.",
    ],
    status: "published",
  },
  {
    organization: "Amber IT Ltd",
    role: "Assistant Network Engineer — RF",
    startDate: "2024-08",
    endDate: "2025-04",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Supported RF infrastructure, signal-quality monitoring, connectivity diagnostics, and optimization work.",
      "Maintained configuration and troubleshooting records for reliable team handoffs.",
    ],
    status: "published",
  },
  {
    organization: "Global Communication",
    role: "Junior IT Support Engineer",
    startDate: "2020-02",
    endDate: "2021-04",
    location: "Shariatpur, Bangladesh",
    bullets: [
      "Resolved endpoint, internet, and LAN incidents and supported CCTV, DVR/NVR, PoE, and remote-viewing deployments.",
    ],
    status: "published",
  },
];

export const experience = publishedOnly(allExperience);
