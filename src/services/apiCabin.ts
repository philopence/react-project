import { CabinFormValues } from "@/schemas/form";
import { CabinResponseSchema, CabinsResponseSchema } from "@/schemas/response";

export async function getCabins(query?: string) {
  try {
    console.log("TODO: validate query");

    let input = "/api/v1/cabins";

    if (query) input += `?${query}`;

    const res = await fetch(input, { method: "GET" });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    console.log("cabins rawData: ", rawData);

    const result = CabinsResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCabin(
  cabinValues: Omit<CabinFormValues, "image"> & {
    image: File | string | undefined | null;
  }
) {
  try {
    console.log("TODO: image upload");

    const res = await fetch("/api/v1/cabins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cabinValues)
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    console.log("cabin rawData: ", rawData);

    const result = CabinResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateCabinById({
  id,
  cabinValues
}: {
  id: string;
  cabinValues: Partial<CabinFormValues>;
}) {
  try {
    // TODO image upload

    const res = await fetch(`/api/v1/cabins/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cabinValues)
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    console.log("cabin rawData: ", rawData);

    const result = CabinResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getCabinById(id: string) {
  try {
    const res = await fetch(`/api/v1/cabins/${id}`, {
      method: "GET"
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    console.log("cabin rawData: ", rawData);

    const result = CabinResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteCabinById(id: string) {
  try {
    const res = await fetch(`/api/v1/cabins/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error();

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
