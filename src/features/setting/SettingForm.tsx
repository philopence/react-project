import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingFormValues, SettingResponse } from "@/schemas/setting";
import useSettingForm from "./useSettingForm";
import useUpdateSettingMutation from "./useUpdateSettingMutation";

export default function SettingForm({
  defaultSetting
}: PropsWithChildren<{
  defaultSetting: SettingResponse;
}>) {
  const form = useSettingForm(defaultSetting);

  const updateSettingMutation = useUpdateSettingMutation();

  function onSubmit(values: SettingFormValues) {
    updateSettingMutation.mutate({ id: defaultSetting._id, setting: values });
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="minNights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Nights</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxNights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Nights</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Guests</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Guests</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={updateSettingMutation.isPending}>
          Update Setting
        </Button>
      </form>
    </Form>
  );
}
