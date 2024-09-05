import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  email: z.string().email(),
  name: z.string()
  // avatar: z.string().nullable()
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function useProfileForm(defaultValues: { name: string }) {
  return useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues
  });
}
