import { ApiError } from "@/lib/ApiError";
import { CabinApi, cabinApiSchema, CabinForm } from "@/schemas/cabin";

export async function getCabins(): Promise<CabinApi[]> {
  try {
    const res = await fetch("/api/v1/cabins", {
      method: "GET",
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = cabinApiSchema.array().parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCabin(cabin: CabinForm): Promise<CabinApi> {
  try {
    if (!cabin.image) throw new Error("Cabin image is required");

    if (cabin.image instanceof File) {
      const uploadFormData = new FormData();

      uploadFormData.append("image", cabin.image);
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

      cabin.image = (await res.json()).url;
    }

    const res = await fetch("/api/v1/cabins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cabin),
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = cabinApiSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateCabinById({
  id,
  cabin,
}: {
  id: string;
  cabin: Partial<CabinForm>;
}): Promise<CabinApi> {
  try {
    if (cabin.image instanceof File) {
      const formData = new FormData();
      formData.append("image", cabin.image);
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(res.statusText);
      cabin.image = (await res.json()).url;
    }

    const res = await fetch(`/api/cabins/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cabin),
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = cabinApiSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getCabinById(id: string): Promise<CabinApi> {
  try {
    const res = await fetch(`/api/cabins/${id}`, {
      method: "GET",
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = cabinApiSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteCabinById(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/cabins/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
