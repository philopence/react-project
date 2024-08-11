import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>
      <div className="grid grid-rows-[auto_1fr]">
        <div>header</div>
        <div>
          main
          <Outlet />
        </div>
      </div>
    </div>
  );
}
