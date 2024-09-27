import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import configuration from "@/lib/configuration";
import { getCabins } from "@/services/apiCabin";

export function useGetCabinsQuery() {
  console.log("TODO prefetch prevPage and nextPage");
  const [searchParams] = useSearchParams();

  searchParams.set("limit", String(configuration.PAGE_SIZE));
  const query = searchParams.toString();

  return useQuery({
    queryKey: ["cabins", query],
    queryFn: () => getCabins(query)
  });
}
