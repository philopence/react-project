import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useUserContext } from "@/contexts/user";

export default function AppLayout() {
  const userContext = useUserContext();
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>
      <div className="grid grid-rows-[auto_1fr]">
        <div>
          header
          {userContext.userInfo?.name}
          <ThemeToggle />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
