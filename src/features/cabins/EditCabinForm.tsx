import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CabinApi, CabinForm } from "@/schemas/cabin";
import useCabinForm from "./useCabinForm";
import useEditCabinMutation from "./useEditCabinMutation";

type Props = {
  cabin: CabinApi;
};

export default function EditCabinForm({ cabin }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, image, ...cabinForm } = cabin;
  const form = useCabinForm(cabinForm);
  const { mutate: editCabinMutate, isPending } = useEditCabinMutation();

  function onSubmit(values: CabinForm) {
    editCabinMutate({ id: _id, cabin: values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* https://github.com/shadcn-ui/ui/issues/443#issuecomment-1563108617 */}
        <FormField
          control={form.control}
          name="image"
          // NOTE don't use value field
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value: _, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  required
                  {...fieldProps}
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Create Cabin
        </Button>
      </form>
    </Form>
  );
}
