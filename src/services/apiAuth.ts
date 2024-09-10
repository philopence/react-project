import { z } from "zod";

export async function register(userData: {
  name: string;
  email: string;
  password: string;
  image?: string;
}) {
  const res = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error();

  const rawData = await res.json();

  const result = z
    .object({
      _id: z.string(),
      email: z.string().email(),
      name: z.string(),
      image: z.string().url().nullable()
    })
    .safeParse(rawData);

  if (!result.success) throw new Error();

  return result.data;
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
