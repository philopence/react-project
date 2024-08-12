import { faker } from "@faker-js/faker";

const cabins = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  image: faker.image.url({ width: 300, height: 200 }),
  name: faker.commerce.productName(),
  price: faker.number.int({ min: 100, max: 1000 }),
  discount: faker.number.int({ min: 1, max: 99 }),
  description: faker.commerce.productDescription(),
  maxCapacity: faker.number.int({ min: 1, max: 8 }),
}));

export async function getCabins() {
  return cabins;
}

export async function deleteCabinById(id: number) {
  console.log(id);
}
