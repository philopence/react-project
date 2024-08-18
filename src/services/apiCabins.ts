import { cabinApiSchema, CabinForm } from "@/schemas/cabin";

export async function createCabin(cabin: CabinForm) {
  const { image, ...otherFields } = cabin;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("otherFields", JSON.stringify(otherFields));

  const res = await fetch("/api/cabins", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(res.statusText);
}

export async function getCabins() {
  const res = await fetch("/api/cabins", {
    method: "GET",
  });

  if (!res.ok) throw new Error(res.statusText);

  const cabins = await cabinApiSchema.array().parseAsync(await res.json());

  return cabins;
}

export async function getCabinById(id: string) {
  const res = await fetch(`/api/cabins/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error(res.statusText);

  const cabin = cabinApiSchema.parse(await res.json());

  return cabin;
}

export async function updateCabinById({
  id,
  cabin,
}: {
  id: string;
  cabin: CabinForm;
}) {
  const { image, ...otherFields } = cabin;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("otherFields", JSON.stringify(otherFields));

  const res = await fetch(`/api/cabins/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error(res.statusText);
}

export async function deleteCabinById(id: string) {
  const res = await fetch(`/api/cabins/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(res.statusText);
}
