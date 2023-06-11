import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const user = { email: "valeriapaulinalustres@yahoo.com.ar" };

const mockedProduct = { user };

describe("Probando rutas de carts", function () {
  it("Probar método GET /api/carts", async function () {
    const response = await request.get("/api/carts");
    //  console.log(response._body)
    expect(response._body.message).to.not.have.lengthOf(0);
  });

  it("Probar método POST /api/carts/:cid/product/:pid", async function () {
    const cid = "646a1c17db72fbd4185b8ef8";
    const pid = "6451252e665fa361c3cb929d";

    const response = await request
      .post(`/api/carts/${cid}/product/${pid}`)
      .send(mockedProduct);

   // console.log(response._body.message);
    expect(
      response._body.message.products.find((el) => el.id === pid).id
    ).to.equal(pid);
  });

  it("Probar método DELETE /api/carts/:cid", async function (){
   const cid = '644dc67deeaea1a6917479b4'
   
       const response = await request.delete(`/api/carts/${cid}`).send({email:'valeriapaulinalustres@yahoo.com.ar'})
   
       expect(response.status).to.equal(200)
         })
   
  
});
