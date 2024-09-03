import { faker } from "@faker-js/faker";
import { CabinResponseData } from "@/schemas/cabin";

export const mockCabins: CabinResponseData[] = Array.from({ length: 10 }).map(
  (_, i) => ({
    _id: faker.string.nanoid(5),
    name: `Cabin NO.${i}`,
    discount: faker.number.int({ min: 1, max: 99 }),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    price: Number(faker.commerce.price()),
    maxCapacity: faker.number.int({ min: 1, max: 10 })
  })
);
