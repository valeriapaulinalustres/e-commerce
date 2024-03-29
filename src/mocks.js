import { faker } from "@faker-js/faker";

export function generateProduct() {
  const product = {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    stock: faker.random.numeric(),
    code: faker.random.alphaNumeric(5),
    thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
    status: faker.datatype.boolean(),
  };

  return product;
}
