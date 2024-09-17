import { PropsWithChildren, useState } from "react";
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
import { ProfileFormValues } from "@/schemas/form";
import { UserResponse } from "@/schemas/response";
import useProfileForm from "./useProfileForm";
import useUpdateProfileMutation from "./useUpdateProfileMutation";

export default function ProfileForm({
  profileValues
}: PropsWithChildren<{
  profileValues: UserResponse;
}>) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    () => profileValues.image
  );
  const form = useProfileForm(profileValues);

  const updateProfileMutation = useUpdateProfileMutation();

  function onSubmit(values: ProfileFormValues) {
    const modifiedValues = Object.entries(form.formState.dirtyFields).reduce(
      (acc, [key]) => {
        acc[key] = values[key as keyof typeof values];
        return acc;
      },
      {} as Record<string, (typeof values)[keyof typeof values]>
    );

    updateProfileMutation.mutate(modifiedValues);
  }

  return (
    <Form {...form}>
      {imageUrl && <img className="aspect-square w-64" src={imageUrl} />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    if (event.target.files === null) return;
                    const file = event.target.files[0];
                    onChange(file);
                    setImageUrl(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
