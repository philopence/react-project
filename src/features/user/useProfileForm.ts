import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileFormSchema, ProfileFormValues } from "@/schemas/form";

export default function useProfileForm({
  name,
  email
}: Omit<ProfileFormValues, "image">) {
  return useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name,
      email
    }
  });
}
