export async function register({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}) {
  console.log(name, email, password);

  return {
    _id: String(new Date().getTime()),
    name,
    email
  };
}

export async function login({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  console.log(email, password);

  return {
    _id: String(new Date().getTime()),
    email,
    name: "John Doe"
  };
}
