import type { SocialLink } from "./types";

const allLinks: SocialLink[] = [
  {
    platform: "tryhackme",
    label: "TryHackMe",
    handle: "sharifmadber",
    url: "https://tryhackme.com/p/sharifmadber",
    public: true,
  },
  {
    platform: "medium",
    label: "Medium",
    handle: "@sharifmadber",
    url: "https://medium.com/@sharifmadber",
    public: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "/in/sharifmadber",
    url: "https://www.linkedin.com/in/sharifmadber/",
    public: true,
  },
  {
    platform: "x",
    label: "X",
    handle: "@sharif_madber",
    url: "https://x.com/sharif_madber",
    public: true,
  },
];

export const socialLinks = allLinks.filter((link) => link.public);
