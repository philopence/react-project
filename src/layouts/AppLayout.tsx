import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useUserInfoContext } from "@/contexts/userInfo";

export default function AppLayout() {
  const userInfoContext = useUserInfoContext();
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>
      <div className="grid grid-rows-[auto_1fr]">
        <div>
          header
          {userInfoContext.userInfo?.name}
          <ThemeToggle />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
