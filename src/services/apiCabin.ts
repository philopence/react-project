import { ResponseError } from "@/lib/ApiError";
import { mockCabins } from "@/lib/mockData";
import { wait } from "@/lib/utils";
import {
  CabinResponse,
  cabinResponseSchema,
  CabinFormValues,
  CabinsResponse
} from "@/schemas/cabin";

export async function getCabins(query?: string): Promise<CabinsResponse> {
  if (import.meta.env.MODE === "development") {
    console.log("query", query);
    await wait(1000);
    return {
      cabins: mockCabins,
      pagination: {
        curPage: 1,
        limit: 3,
        totalItems: 8,
        totalPages: 3
      }
    };
  }

  return {
    cabins: mockCabins,
    pagination: {
      curPage: 1,
      limit: 3,
      totalItems: 8,
      totalPages: 3
    }
  };

  // try {
  //   const baseURL = "/api/v1/cabins";
  //
  //   const query = new URLSearchParams();
  //
  //   if (searchParams?.discount) {
  //     query.set("discount", searchParams.discount);
  //   }
  //
  //   const fetchInput = `${baseURL}?${query.toString()}`;
  //   const res = await fetch(fetchInput, { method: "GET" });
  //
  //   if (!res.ok) {
  //     const result = errResponseSchema.safeParse(await res.json());
  //
  //     if (!result.success)
  //       throw new Error("server response verification failed.");
  //
  //     throw new ResponseError(res.status, result.data.message);
  //   }
  //
  //   const data = cabinApiSchema.array().parse(await res.json());
  //
  //   return data;
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }
}

export async function createCabin(
  cabinValues: CabinFormValues
): Promise<CabinResponse> {
  if (import.meta.env.MODE === "development") {
    console.log(cabinValues);
    await wait(1000);
    return mockCabins[0];
  }

  try {
    if (!cabinValues.image) throw new Error("Cabin image is required");

    if (cabinValues.image instanceof File) {
      const uploadFormData = new FormData();

      uploadFormData.append("image", cabinValues.image);
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: uploadFormData
      });

      if (!res.ok)
        throw new ResponseError(res.status, (await res.json()).message);

      cabinValues.image = (await res.json()).url;
    }

    const res = await fetch("/api/v1/cabins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cabinValues)
    });

    if (!res.ok)
      throw new ResponseError(res.status, (await res.json()).message);

    const data = cabinResponseSchema.parse(await res.json());

    return data;
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
}): Promise<CabinResponse> {
  if (import.meta.env.MODE === "development") {
    console.log("cabinValues", cabinValues);
    await wait(1000);
    return mockCabins.find((cabin) => cabin._id === id)!;
  }
  try {
    if (cabinValues.image instanceof File) {
      const formData = new FormData();
      formData.append("image", cabinValues.image);
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error(res.statusText);
      cabinValues.image = (await res.json()).url;
    }

    const res = await fetch(`/api/cabins/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cabinValues)
    });

    if (!res.ok)
      throw new ResponseError(res.status, (await res.json()).message);

    const data = cabinResponseSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getCabinById(id: string): Promise<CabinResponse> {
  if (import.meta.env.MODE === "development") {
    console.log("id", id);
    await wait(1000);
    return mockCabins.find((cabin) => cabin._id === id)!;
  }

  try {
    const res = await fetch(`/api/cabins/${id}`, {
      method: "GET"
    });

    if (!res.ok)
      throw new ResponseError(res.status, (await res.json()).message);

    const data = cabinResponseSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteCabinById(id: string): Promise<null> {
  if (import.meta.env.MODE === "development") {
    console.log("id", id);
    await wait(1000);
    const index = mockCabins.findIndex((cabin) => cabin._id === id)!;

    mockCabins.splice(index, 1);

    return null;
  }

  try {
    const res = await fetch(`/api/cabins/${id}`, {
      method: "DELETE"
    });

    if (!res.ok)
      throw new ResponseError(res.status, (await res.json()).message);

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
