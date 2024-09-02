import { useQuery } from "@tanstack/react-query";
import UpdateSetting from "@/features/setting/UpdateSetting";
import { getSetting } from "@/services/apiSetting";

export default function SettingsPage() {
  const { data: setting, isLoading } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting
  });

  if (isLoading) return null;

  return (
    <>
      SettingsPage
      {setting && <UpdateSetting setting={setting} />}
    </>
  );
}
