import type { PublicationStatus } from "./types";

export interface Profile {
  name: "Sharif Madber";
  professionalTitle: string;
  heroLead: string;
  heroAccent: string;
  shortSummary: string;
  longBio?: string;
  location?: string;
  availability?: string;
  portrait?: string;
  cvPath?: string;
  status: PublicationStatus;
}

export const profile: Profile = {
  name: "Sharif Madber",
  professionalTitle: "Network Engineer & Cybersecurity Practitioner",
  heroLead: "Secure the signal.",
  heroAccent: "Keep systems online.",
  shortSummary:
    "I engineer resilient connectivity, observable infrastructure, and defensible systems across live network and security operations.",
  longBio:
    "I’m a network operator in Makkah with an operations-first mindset shaped by live CCTV, security-system, and connectivity support. Before that, I supported RF networks and user infrastructure across Bangladesh, turning signal, routing, and service incidents into documented fixes. I build secure systems by understanding how they fail—then hardening the path from endpoint to edge.",
  location: "Makkah, Saudi Arabia",
  availability: "Open to network, NOC, and security opportunities",
  portrait: undefined,
  cvPath: undefined,
  status: "published",
};

export const focusAreas: string[] = [
  "Infrastructure & Hardware",
  "Enterprise Networking",
  "Development & Automation",
  "Monitoring & Security",
];
