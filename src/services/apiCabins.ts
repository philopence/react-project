import supabase from "@/lib/supabase";

/**
 * @description fetch all cabins
 * @returns Array<{id, name, image, price, discount, description, maxCapacity}>
 */

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error !== null) throw new Error();

  // TODO zod validation

  const cabinsDTO = cabins.map((cabin) => ({
    id: cabin.id,
    name: cabin.name,
    image: cabin.image,
    price: cabin.price,
    discount: cabin.discount,
    description: cabin.description,
    maxCapacity: cabin.max_capacity,
  }));

  return cabinsDTO;
}
