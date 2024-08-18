import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinForm, cabinFormSchema } from "@/schemas/cabin";

type CabinFormWithoutImage = Omit<CabinForm, "image">;

export default function useCabinForm(cabin?: CabinFormWithoutImage) {
  const form = useForm<CabinForm>({
    resolver: zodResolver(cabinFormSchema),
    defaultValues: {
      // image: "", // NOTE can't set default file
      name: cabin ? cabin.name : "",
      price: cabin ? cabin.price : 0,
      maxCapacity: cabin ? cabin.maxCapacity : 0,
      discount: cabin ? cabin.discount : 0,
      description: cabin ? cabin.description : "",
    },
  });

  return form;
}
