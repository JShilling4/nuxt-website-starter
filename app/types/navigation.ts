export type NavSubItem = {
  label: string;
  to: string;
};

export type NavLinkItem = {
  kind: "link";
  label: string;
  to: string;
};

export type NavDropdownItem = {
  kind: "dropdown";
  id: string;
  label: string;
  to: string;
  children: NavSubItem[];
};

export type NavItem = NavLinkItem | NavDropdownItem;
