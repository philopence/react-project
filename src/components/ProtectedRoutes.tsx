import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserInfoContext } from "@/contexts/userInfo";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";
import { useToast } from "./ui/use-toast";

export default function ProtectedRoutes() {
  const getUserInfoQuery = useGetUserInfoQuery();

  const userInfoContext = useUserInfoContext();

  const { toast } = useToast();

  useEffect(() => {
    if (!getUserInfoQuery.isPending && !getUserInfoQuery.isError) {
      userInfoContext.storageUserInfo(getUserInfoQuery.data);
    }

    if (getUserInfoQuery.isError) {
      toast({
        variant: "destructive",
        description: getUserInfoQuery.error.message
      });
    }
  }, [
    getUserInfoQuery.data,
    getUserInfoQuery.isError,
    getUserInfoQuery.isPending,
    userInfoContext,
    toast,
    getUserInfoQuery
  ]);

  if (getUserInfoQuery.isPending) return "Loading...";

  if (getUserInfoQuery.isError)
    return <Navigate to={{ pathname: "/login" }} replace />;

  // userInfoContext.storageUserInfo(getUserInfoQuery.data);

  return <Outlet />;
}
