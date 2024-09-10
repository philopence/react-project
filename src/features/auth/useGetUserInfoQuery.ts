import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/apiAuth";

export default function useGetUserInfoQuery() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo
  });
}
