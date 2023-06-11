import supertest from "supertest";
import { expect } from "chai";
import { faker } from '@faker-js/faker'

const request = supertest("http://localhost:8080");

const newProduct = {
  title: "Caléndula",
  description: "flor",
  category: "Anuales",
  stock: 2,
  price: 300,
  thumbnails: [],
  status: true,
  code: faker.string.alphanumeric(5),
  owner: "LucasAdmin",
};

const owner = { email: "valeriapaulinalustres@yahoo.com.ar" };

const mockedAddProduct = { newProduct, owner };

describe("Probando rutas de products", function () {
    
  it("Probar método GET /api/products", async function () {
    const response = await request.get("/api/products");
    // console.log(response._body.response.products)
    expect(response._body.response.products).to.not.have.lengthOf(0);
  });

  it("Probar método POST /api/products", async function () {
    const response = await request.post("/api/products").send(mockedAddProduct);
   // console.log(response._body);
    expect(response._body.response.message).to.equal(
      "Producto creado con éxito"
    );
  });

  it("Probar método DELETE /api/products/:pid", async function (){
const pid = '647339860fed46993e965422'

    const response = await request.delete(`/api/products/${pid}`).send({email:'valeriapaulinalustres@yahoo.com.ar'})

    expect(response.status).to.equal(200)
      })
});
