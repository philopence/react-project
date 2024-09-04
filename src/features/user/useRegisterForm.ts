import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirm: z.string()
  })
  .refine((data) => data.password === data.confirm, {
    message: "password don't match",
    path: ["confirm"]
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function useRegisterForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: ""
    }
  });
}
