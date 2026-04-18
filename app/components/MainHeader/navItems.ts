import type { NavItem } from "~/types";

export const navItems: NavItem[] = [
  { kind: "link", label: "Home", to: "/" },
  {
    kind: "dropdown",
    id: "about",
    label: "About",
    to: "/about",
    children: [
      { label: "Service Area", to: "/service-area" },
      { label: "Reviews", to: "/reviews" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  { kind: "link", label: "Contact", to: "/contact" },
];
