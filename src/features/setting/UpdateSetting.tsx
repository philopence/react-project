import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SettingApi, SettingForm, settingFormSchema } from "@/schemas/setting";
import { updateSetting } from "@/services/apiSetting";

type Props = {
  setting: SettingApi;
};
export default function UpdateSetting({ setting }: Props) {
  const { _id, ...otherSetting } = setting;

  const form = useForm<SettingForm>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: otherSetting,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateSettingMutate, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
      toast({ description: "updated setting successfully!" });
    },
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to Update Setting",
      }),
  });

  function onSubmit(values: SettingForm) {
    updateSettingMutate({ id: _id, setting: values });
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

        <Button type="submit" disabled={isPending}>
          Update Setting
        </Button>
      </form>
    </Form>
  );
}
