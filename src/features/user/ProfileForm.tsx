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
import useProfileForm, { ProfileFormValues } from "./useProfileForm";
import useUpdateProfileMutation from "./useUpdateProfileMutation";

export default function ProfileForm({
  defaultValues
}: PropsWithChildren<{
  defaultValues: ProfileFormValues;
}>) {
  const form = useProfileForm(defaultValues);

  const updateProfileMutation = useUpdateProfileMutation();

  function onSubmit(values: ProfileFormValues) {
    updateProfileMutation.mutate({ name: values.name });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={updateProfileMutation.isPending}>
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
