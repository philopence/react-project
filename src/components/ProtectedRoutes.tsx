import { Navigate, Outlet } from "react-router-dom";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";

export default function ProtectedRoutes() {
  const getUserInfoQuery = useGetUserInfoQuery();

  if (getUserInfoQuery.isPending) return "Loading...";

  if (getUserInfoQuery.isError)
    return <Navigate to={{ pathname: "/login" }} replace />;

  return <Outlet />;
}
