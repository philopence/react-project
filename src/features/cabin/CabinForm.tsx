import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CabinResponse, CabinFormValues } from "@/schemas/cabin";
import useCabinForm from "./useCabinForm";
import useCreateCabinMutation from "./useCreateCabinMutation";
import useUpdateCabinMutation from "./useUpdateCabinMutation";

export default function CabinForm({
  defaultValues
}: {
  defaultValues?: CabinResponse;
}) {
  const form = useCabinForm(defaultValues);

  const updateCabinMutation = useUpdateCabinMutation();

  const createCabinMutation = useCreateCabinMutation();

  function onSubmit(values: CabinFormValues) {
    if (defaultValues) {
      updateCabinMutation.mutate({
        id: defaultValues._id,
        cabinValues: values
      });
    } else {
      createCabinMutation.mutate(values);
    }
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
          // NOTE don't need value field
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value: _, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Cabin Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
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
        <Button type="submit" disabled={updateCabinMutation.isPending}>
          Update Cabin
        </Button>
      </form>
    </Form>
  );
}
