import { useMutation } from "@tanstack/react-query";
import { RegisterFormValues } from "./useRegisterForm";

export default function useRegisterMutation() {
  return useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      // email validation
      return {
        _id: String(new Date().getTime()),
        ...values,
        avatar: null
      };
    },
    onSuccess: () => {},
    onError: () => {}
  });
}
