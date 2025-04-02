//here wwe try tp test the apis, the validations
//we will try to mock the service now
import request from "supertest"; //for https requests
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes, {catalogService} from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
    return {
        name : faker.commerce.productName(),
        description : faker.commerce.productDescription(),
        stock : faker.number.int({min: 10, max: 100}),
        price : +faker.commerce.price(),
    }
};



describe.skip("catalog routes",  () => {

    describe.skip("POST /products", () => {
        test("should create product", async () => {
            const requestBody = mockRequest();
            const product = ProductFactory.build();

            jest.spyOn(catalogService, 'createProduct' ).mockImplementationOnce( () => Promise.resolve(product) );

            const response = await request(app).post("/products").send(requestBody)
            .set("Accept", "application/json");

            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);

        });

        test("should throw validation error 400", async () => {
            
            const response = await request(app).post("/products").send({}).set("Accept", "application/json");
            expect(response.status).toBe(400);
        })
    });

    describe("/PATCH product/:id", () => {
        test("should update product with 200 response", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            
            jest.spyOn(catalogService, "updateProduct")
            .mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
            .patch(`/products/${product.id}`)
            .send(requestBody)
            .set("Accept", "application/json")
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })
    });

    describe("GET /products", () => {
        test("should return a range of products based on limit and offset", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit);
            jest
              .spyOn(catalogService, "getProducts")
              .mockImplementationOnce(() => Promise.resolve(products));
            const response = await request(app)
              .get(`/products?limit=${randomLimit}&offset=0`)
              .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
          });
    });

    describe("GET /product/:id", () => {
        test("should return single product", async () => {
            
            const product = ProductFactory.build();
            
            jest.spyOn(catalogService, "getProduct")
            .mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
            .get(`/product/${product.id}`)
            .set("Accept", "application/json");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })
    });

    describe("DELETE /product/:id", () => {
        test("should delete product", async () => {
            const product = ProductFactory.build();
            jest.spyOn(catalogService, "deleteProduct")
            .mockImplementationOnce( () => Promise.resolve({id: product.id!}) );

            const response = await request(app)
            .delete(`/product/${product.id}`)
            .set("Accept", "application/json");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({id: product.id});
        })
    })

})