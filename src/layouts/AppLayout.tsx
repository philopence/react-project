import { Link, Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/features/auth/LogoutButton";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";

export default function AppLayout() {
  const getUserInfoQuery = useGetUserInfoQuery();

  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>

      <div className="grid grid-rows-[auto_1fr]">
        <div>
          header
          {getUserInfoQuery.data?.name}
          <LogoutButton />
          <ThemeToggle />
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
