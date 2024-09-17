import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinFormValues, CabinFormSchema } from "@/schemas/form";

export default function useCabinForm(
  defaultValues: Omit<CabinFormValues, "image"> = {
    name: "",
    description: "",
    price: 0,
    maxCapacity: 0,
    discount: 0
  }
) {
  const form = useForm<CabinFormValues>({
    resolver: zodResolver(CabinFormSchema),
    defaultValues
  });

  return form;
}
