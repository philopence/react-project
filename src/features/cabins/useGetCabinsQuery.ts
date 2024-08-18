import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabins";

export function useGetCabinsQuery() {
  const query = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return query;
}
