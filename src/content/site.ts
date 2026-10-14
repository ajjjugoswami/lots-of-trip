import type { NavItem, SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Lots of Trip",
  shortName: "LOT",
  description:
    "Small-group journeys, treks and pilgrimages across Uttarakhand and Himachal Pradesh — planned by people who live in the mountains.",
  url: "https://lotsoftrip.com",
  established: "2026",
  copyrightYear: 2026,
  contact: {
    phoneDisplay: "+91 98765 43210",
    phoneE164: "+919876543210",
    whatsappNumber: "919876543210",
    email: "hello@lotsoftrip.com",
    address: "Rajpur Road, Dehradun, Uttarakhand 248001",
    hours: "Mon – Sat · 9:30 am – 7:30 pm IST",
  },
  social: {
    instagram: {
      handle: "@lotsoftrip_",
      url: "https://www.instagram.com/lotsoftrip_/",
    },
  },
};

export const mainNav: NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/tours" },
  { label: "Uttarakhand", href: "/journeys/uttarakhand" },
  { label: "Himachal", href: "/journeys/himachal" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "All destinations", href: "/destinations" },
      { label: "Curated journeys", href: "/tours" },
      { label: "Uttarakhand", href: "/journeys/uttarakhand" },
      { label: "Himachal Pradesh", href: "/journeys/himachal" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Plan a trip", href: "/contact" },
      { label: "Photo credits", href: "/credits" },
    ],
  },
];
