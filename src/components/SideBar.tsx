import {
  House,
  LayoutDashboard,
  ScrollText,
  Settings,
  Users
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard />
  },
  {
    label: "Bookings",
    to: "/bookings",
    icon: <ScrollText />
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
            <li key={link.label}>
              <NavLink className="flex items-center" to={link.to}>
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
