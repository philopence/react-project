import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinForm, cabinFormSchema } from "@/schemas/cabin";

export default function useCabinForm(cabin?: Omit<CabinForm, "image">) {
  const defaultValues = cabin || {
    name: "",
    price: 0,
    maxCapacity: 0,
    discount: 0,
    description: ""
  };

  const form = useForm<CabinForm>({
    resolver: zodResolver(cabinFormSchema),
    defaultValues
  });

  return form;
}
