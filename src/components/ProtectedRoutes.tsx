import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";
import { useToast } from "./ui/use-toast";

export default function ProtectedRoutes() {
  const getUserInfoQuery = useGetUserInfoQuery();

  const { toast } = useToast();

  useEffect(() => {
    if (getUserInfoQuery.isError) {
      toast({
        variant: "destructive",
        description: getUserInfoQuery.error.message
      });
    }
  }, [getUserInfoQuery.error?.message, getUserInfoQuery.isError, toast]);

  if (getUserInfoQuery.isPending) return "Loading...";

  if (getUserInfoQuery.isError)
    return <Navigate to={{ pathname: "/login" }} replace />;

  return <Outlet />;
}
