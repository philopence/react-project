import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingFormSchema, SettingFormValues } from "@/schemas/form";

export default function useSettingForm({
  maxGuests,
  minGuests,
  maxNights,
  minNights,
  breakfastPrice
}: SettingFormValues) {
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(SettingFormSchema),
    defaultValues: {
      maxGuests,
      minGuests,
      maxNights,
      minNights,
      breakfastPrice
    }
  });

  return form;
}
