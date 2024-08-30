import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>
      <div className="grid grid-rows-[auto_1fr]">
        <div>
          header <ThemeToggle />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
