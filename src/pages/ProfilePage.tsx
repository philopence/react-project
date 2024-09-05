import useGetUserInfoQuery from "@/features/auth/useGetUserInfoQuery";
import ProfileForm from "@/features/user/ProfileForm";

export default function ProfilePage() {
  const getUserInfoQuery = useGetUserInfoQuery();

  if (getUserInfoQuery.isPending) return "Loading...";

  if (getUserInfoQuery.isError)
    return `Error: ${getUserInfoQuery.error.message}`;

  return (
    <section>
      <header>ProfilePage</header>
      <main>
        <ProfileForm defaultValues={getUserInfoQuery.data} />
      </main>
    </section>
  );
}
