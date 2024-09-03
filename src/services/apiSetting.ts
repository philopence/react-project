import { wait } from "@/lib/utils";
import { SettingResponse, SettingFormValues } from "@/schemas/setting";

export async function getSetting(): Promise<SettingResponse> {
  await wait(1000);
  return {
    _id: "001",
    maxGuests: 10,
    minGuests: 1,
    maxNights: 30,
    minNights: 1,
    breakfastPrice: 5
  };
  // try {
  //   const res = await fetch("/api/v1/setting", { method: "GET" });
  //
  //   if (!res.ok) throw new Error(res.statusText);
  //
  //   const data = settingResponseSchema.parse(await res.json());
  //
  //   return data;
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }
}

export async function updateSettingById({
  id,
  setting
}: {
  id: string;
  setting: Partial<SettingFormValues>;
}): Promise<SettingResponse> {
  console.log(id, setting);
  return {
    _id: "001",
    maxGuests: 10,
    minGuests: 1,
    maxNights: 30,
    minNights: 1,
    breakfastPrice: 5,
    ...setting
  };
  // try {
  //   const res = await fetch(`/api/setting/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(setting)
  //   });
  //
  //   if (!res.ok)
  //     throw new ResponseError(res.status, (await res.json()).message);
  //
  //   const data = settingResponseSchema.parse(await res.json());
  //
  //   return data;
  // } catch (err) {
  //   console.log(err);
  //   throw err;
  // }
}
