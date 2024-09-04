import { useQuery } from "@tanstack/react-query";

export default function useGetUserInfoQuery() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      // throw new Error("some error");
      return {
        _id: String(new Date().getTime()),
        name: "John Doe",
        email: "example@email.com"
      };
    }
  });
}
