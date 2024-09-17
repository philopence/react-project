import { SettingResponse, SettingResponseSchema } from "@/schemas/response";

export async function getSetting() {
  try {
    const res = await fetch("/api/v1/setting", { method: "GET" });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = SettingResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateSettingById({
  id,
  settingData
}: {
  id: string;
  settingData: Partial<SettingResponse>;
}) {
  try {
    const res = await fetch(`/api/v1/setting/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(settingData)
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = SettingResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
