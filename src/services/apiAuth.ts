import { UserResponseSchema } from "@/schemas/response";

export async function register({
  name,
  email,
  password,
  image
}: {
  name: string;
  email: string;
  password: string;
  image?: string;
}) {
  try {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        image
      })
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = UserResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function login({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error();

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logout() {
  try {
    const res = await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) throw new Error();

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserInfo() {
  try {
    const res = await fetch("/api/v1/users/me/profile", {
      method: "GET"
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = UserResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateProfile({ name }: { name: string }) {
  try {
    const res = await fetch("/api/v1/users/me/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ name })
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = UserResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
