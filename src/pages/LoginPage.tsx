import LoginForm from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <section>
      <div>
        <img src="/react.svg" alt="app logo" />
        <h1>Login to your account</h1>
      </div>
      <div>
        <LoginForm />
      </div>
    </section>
  );
}
