import { PropsWithChildren } from "react";
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
import { CabinFormValues } from "@/schemas/form";
import { CabinResponse } from "@/schemas/response";
import useCabinForm from "./useCabinForm";
import useCreateCabinMutation from "./useCreateCabinMutation";
import useUpdateCabinMutation from "./useUpdateCabinMutation";

export default function CabinForm({
  cabinValues
}: PropsWithChildren<{
  cabinValues?: CabinResponse;
}>) {
  const defaultValues = cabinValues && {
    name: cabinValues.name,
    description: cabinValues.description,
    price: cabinValues.price,
    maxCapacity: cabinValues.maxCapacity,
    discount: cabinValues.discount
  };

  const form = useCabinForm(defaultValues);

  const updateCabinMutation = useUpdateCabinMutation();
  const createCabinMutation = useCreateCabinMutation();

  function onSubmit(values: CabinFormValues) {
    if (cabinValues) {
      const modifiedValues = Object.entries(form.formState.dirtyFields).reduce(
        (acc, [key]) => {
          acc[key] = values[key as keyof typeof values];
          return acc;
        },
        {} as Record<string, (typeof values)[keyof typeof values]>
      );

      updateCabinMutation.mutate({
        id: cabinValues._id,
        cabinValues: modifiedValues
      });
      return;
    }

    createCabinMutation.mutate(values);
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
                <Input required {...field} />
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
                <Input required type="number" {...field} />
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
                <Input required type="number" {...field} />
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
                <Textarea required {...field} />
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
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Cabin Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...fieldProps}
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            createCabinMutation.isPending || updateCabinMutation.isPending
          }
        >
          {`${cabinValues ? "Update" : "Create"} cabin`}
        </Button>
      </form>
    </Form>
  );
}
