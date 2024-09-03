import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const cabinSortSchema = z.object({
  field: z.enum(["price", "maxCapacity"]),
  order: z.enum(["asc", "desc"])
});

/**
 * ?sort=-price => Descending
 * ?sort=price => Ascending
 * @description update sort search param
 */
export default function CabinSorter() {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  function closeAlertDialog() {
    setOpenAlertDialog(false);
  }

  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogTrigger asChild>
        <Button>Sort By</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Chose sort field and order</AlertDialogTitle>
        <AlertDialogDescription>
          You can sort cabin by price and max capacity
        </AlertDialogDescription>
        <SortForm onConfirm={closeAlertDialog} onConcel={closeAlertDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SortForm({
  onConfirm,
  onConcel
}: PropsWithChildren<{
  onConfirm: () => void;
  onConcel: () => void;
}>) {
  const form = useForm<z.infer<typeof cabinSortSchema>>({
    resolver: zodResolver(cabinSortSchema),
    defaultValues: {
      order: "asc"
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data: z.infer<typeof cabinSortSchema>) {
    const sortValue = `${data.order === "desc" ? "-" : ""}${data.field}`;

    searchParams.set("sort", sortValue);

    setSearchParams(searchParams);

    onConfirm();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Chose a Order</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="asc" />
                    </FormControl>
                    <FormLabel className="font-normal">Ascending</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="desc" />
                    </FormControl>
                    <FormLabel className="font-normal">Descending</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Chose a Field</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="price" />
                    </FormControl>
                    <FormLabel className="font-normal">by Price</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="maxCapacity" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      by Max Capacity
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" onClick={onConcel}>
            Concel
          </Button>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Form>
  );
}
