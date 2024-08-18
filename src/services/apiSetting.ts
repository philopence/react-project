import { settingApiSchema, SettingForm } from "@/schemas/setting";

export async function getSetting() {
  const res = await fetch("/api/setting", { method: "GET" });

  if (!res.ok) throw new Error(res.statusText);

  const setting = settingApiSchema.parseAsync(await res.json());

  return setting;
}

export async function updateSetting({
  id,
  setting,
}: {
  id: string;
  setting: SettingForm;
}) {
  const res = await fetch(`/api/setting/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setting),
  });

  if (!res.ok) throw new Error(res.statusText);
}
