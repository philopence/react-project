import configuration from "@/lib/configuration";
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

    const result = CabinsResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCabin({
  name,
  description,
  price,
  maxCapacity,
  discount,
  image
}: Omit<CabinFormValues, "image"> & {
  image: File | string | undefined | null;
}) {
  try {
    if (image instanceof File) {
      let res = await fetch("/api/v1/signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          image: image.name
        })
      });

      if (!res.ok) throw new Error();

      let rawData = await res.json();

      const { signedUrl } = rawData;

      const formData = new FormData();

      formData.set("image", image);
      res = await fetch(signedUrl as string, {
        method: "PUT",
        body: formData
      });

      if (!res.ok) throw new Error();

      rawData = await res.json();

      image = `${configuration.STORAGE_URL}/${rawData.Key}`;
    }

    const cabinValues = {
      name,
      description,
      price,
      maxCapacity,
      discount,
      image
    };

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
