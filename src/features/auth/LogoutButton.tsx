import { Button } from "@/components/ui/button";
import useLogoutMutation from "./useLogoutMutation";

export default function LogoutButton() {
  const logoutMutation = useLogoutMutation();

  return (
    <Button
      disabled={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate()}
    >
      Logout
    </Button>
  );
}
