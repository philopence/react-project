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
import { SettingFormValues } from "@/schemas/form";
import { SettingResponse } from "@/schemas/response";
import useSettingForm from "./useSettingForm";
import useUpdateSettingMutation from "./useUpdateSettingMutation";

export default function SettingForm({
  settingValues
}: PropsWithChildren<{
  settingValues: SettingResponse;
}>) {
  const form = useSettingForm(settingValues);

  const updateSettingMutation = useUpdateSettingMutation();

  function onSubmit(values: SettingFormValues) {
    updateSettingMutation.mutate({
      id: settingValues._id,
      settingData: values
    });
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

        <FormField
          control={form.control}
          name="breakfastPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breakfast Price</FormLabel>
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
