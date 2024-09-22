import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinFormValues, CabinFormSchema } from "@/schemas/form";

export default function useCabinForm(
  defaultValues?: Omit<CabinFormValues, "image">
) {
  console.log(defaultValues);
  const form = useForm<CabinFormValues>({
    resolver: zodResolver(CabinFormSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price: 0,
      maxCapacity: 0,
      discount: 0
    }
  });

  return form;
}
