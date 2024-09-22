import {
  House,
  LayoutDashboard,
  ScrollText,
  Settings,
  Users
} from "lucide-react";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard />
  },
  {
    label: "Cabins",
    to: "/cabins",
    icon: <House />
  },
  {
    label: "Users",
    to: "/users",
    icon: <Users />
  },
  {
    label: "Bookings",
    to: "/bookings",
    icon: <ScrollText />
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <Settings />
  }
];

export default function SideBar() {
  return (
    <aside className="space-y-8 p-8">
      <img src="/react.svg" alt="logo" />
      <nav>
        <ul>
          {navLinks.map((link) => (
            <LinkItem key={link.to} to={link.to}>
              {link.icon}
              <span>{link.label}</span>
            </LinkItem>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

/**
 * CSS: .active {} for current link
 */
function LinkItem({
  to,
  children
}: PropsWithChildren<{
  to: string;
}>) {
  return (
    <li>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}
