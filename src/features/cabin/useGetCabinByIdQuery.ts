import { useQuery } from "@tanstack/react-query";
import { getCabinById } from "@/services/apiCabin";

export default function useGetCabinByIdQuery(id: string) {
  return useQuery({
    queryKey: ["cabins", id],
    queryFn: () => getCabinById(id)
  });
}
