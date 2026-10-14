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
  { label: "Journeys", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const mobileNav: NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/tours" },
  { label: "Uttarakhand", href: "/journeys/uttarakhand" },
  { label: "Himachal Pradesh", href: "/journeys/himachal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const companyNav: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Plan a trip", href: "/contact" },
  { label: "All destinations", href: "/destinations" },
  { label: "Photo credits", href: "/credits" },
];

export const legalNav: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Photo credits", href: "/credits" },
  { label: "Journeys", href: "/tours" },
];

export const bookingStatus = "Now planning winter treks · 2026–27";
