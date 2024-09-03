import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinFormValues, cabinFormSchema } from "@/schemas/cabin";

export default function useCabinForm(
  cabinValues?: Omit<CabinFormValues, "image">
) {
  const defaultValues = cabinValues || {
    name: "",
    price: 0,
    maxCapacity: 0,
    discount: 0,
    description: ""
  };

  const form = useForm<CabinFormValues>({
    resolver: zodResolver(cabinFormSchema),
    defaultValues
  });

  return form;
}
