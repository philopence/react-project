import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabin";

export function useGetCabinsQuery(query?: string) {
  return useQuery({
    queryKey: ["cabins", query],
    queryFn: () => getCabins(query)
  });
}
