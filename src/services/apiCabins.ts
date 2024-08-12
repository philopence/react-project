import { faker } from "@faker-js/faker";

export async function getCabins() {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    image: faker.image.url({ width: 300, height: 200 }),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 100, max: 1000 }),
    discount: faker.number.int({ min: 1, max: 99 }),
    description: faker.commerce.productDescription(),
    maxCapacity: faker.number.int({ min: 1, max: 8 }),
  }));
}
