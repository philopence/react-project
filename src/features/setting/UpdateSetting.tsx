import SettingForm from "./SettingForm";
import useGetSettingQuery from "./useGetSettingQuery";

export default function UpdateSetting() {
  const getSettingQuery = useGetSettingQuery();

  if (getSettingQuery.isPending) return "Loading...";

  if (getSettingQuery.isError) return `Error: ${getSettingQuery.error.message}`;

  return <SettingForm settingValues={getSettingQuery.data} />;
}
