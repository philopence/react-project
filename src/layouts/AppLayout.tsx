import { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
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
      {image && <UserAvatar name={name} image={image} />}
      <Link
        className={buttonVariants({ variant: "link" })}
        to={{ pathname: "/profile" }}
      >
        {getUserInfoQuery.data.name}
      </Link>
      <LogoutButton />
      <ThemeToggle />
    </header>
  );
}

function UserAvatar({
  name,
  image
}: PropsWithChildren<{ name: string; image: string }>) {
  return (
    <Avatar>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
