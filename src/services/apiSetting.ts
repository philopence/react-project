import { ApiError } from "@/lib/ApiError";
import { SettingApi, settingApiSchema, SettingForm } from "@/schemas/setting";

export async function getSetting(): Promise<SettingApi> {
  try {
    const res = await fetch("/api/v1/setting", { method: "GET" });

    if (!res.ok) throw new Error(res.statusText);

    const data = settingApiSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateSettingById({
  id,
  setting
}: {
  id: string;
  setting: Partial<SettingForm>;
}): Promise<SettingApi> {
  try {
    const res = await fetch(`/api/setting/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(setting)
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = settingApiSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
