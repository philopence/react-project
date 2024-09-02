import { useQuery } from "@tanstack/react-query";
import { getSetting } from "@/services/apiSetting";

export default function useGetSettingQuery() {
  const query = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting
  });

  return query;
}
