import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingFormValues, settingFormSchema } from "@/schemas/setting";

export default function useSettingForm(defaultSetting: SettingFormValues) {
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: defaultSetting
  });

  return form;
}
