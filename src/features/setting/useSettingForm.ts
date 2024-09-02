import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingForm, settingFormSchema } from "@/schemas/setting";

export default function useSettingForm(defaultSetting: SettingForm) {
  const form = useForm<SettingForm>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: defaultSetting
  });

  return form;
}
