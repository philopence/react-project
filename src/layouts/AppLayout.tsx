import { Link, Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/auth/LogoutButton";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";

export default function AppLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr]">
      <div>
        <SideBar />
      </div>

      <div className="grid grid-rows-[auto_1fr]">
        <div>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const getUserInfoQuery = useGetUserInfoQuery();

  if (getUserInfoQuery.isPending) return "loading...";

  if (getUserInfoQuery.isError)
    return `Error: ${getUserInfoQuery.error.message}`;

  const { image, name } = getUserInfoQuery.data;

  return (
    <header className="flex items-center justify-end gap-2">
      {image ? <img src={image} alt={`avatar of ${name}`} /> : null}
      <Button variant={"link"} asChild>
        <Link to={{ pathname: "/profile" }}>{getUserInfoQuery.data.name}</Link>
      </Button>
      <LogoutButton />
      <ThemeToggle />
    </header>
  );
}
