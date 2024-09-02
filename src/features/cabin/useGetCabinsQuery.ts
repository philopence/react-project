import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabin";

export function useGetCabinsQuery() {
  const query = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  });

  return query;
}
