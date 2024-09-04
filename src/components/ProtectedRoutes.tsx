import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserInfoContext } from "@/contexts/userInfo";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";

export default function ProtectedRoutes() {
  const getUserInfoQuery = useGetUserInfoQuery();

  const userInfoContext = useUserInfoContext();

  useEffect(() => {
    if (!getUserInfoQuery.isPending && !getUserInfoQuery.isError) {
      userInfoContext.storageUserInfo(getUserInfoQuery.data);
    }
  }, [
    getUserInfoQuery.data,
    getUserInfoQuery.isError,
    getUserInfoQuery.isPending,
    userInfoContext
  ]);

  if (getUserInfoQuery.isPending) return "Loading...";

  if (getUserInfoQuery.isError) {
    console.log(getUserInfoQuery.error.message);

    return <Navigate to={{ pathname: "/login" }} replace />;
  }

  // userInfoContext.storageUserInfo(getUserInfoQuery.data);

  return <Outlet />;
}
