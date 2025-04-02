import { de, faker } from "@faker-js/faker/.";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from "../../models/product.modules";
import { ProductFactory } from "../../utils/fixtures";


const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 0, max: 100 }),
        ...rest
    }
}

describe.skip( "catalogService",() => {

    // MockCatalogRepository is a mock implementation of ICatalogRepository, so we can use it to test the CatalogService 
    let repository: ICatalogRepository;
    
    beforeEach( () => {
        //here we are creating a new instance of the MockCatalogRepository before each test
        repository = new MockCatalogRepository();
    });


    afterEach( () => {  
        repository = {} as MockCatalogRepository;
    });


    describe.skip("createProduct", () => {
        test("should create a product", async () => {

            const service = new CatalogService(repository);

            const reqBody = mockProduct({
                price: +faker.number.int({ min: 1, max: 1000 }),
            });


            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
            
        });

        test("test unable to create product", async () => {

            const service = new CatalogService(repository);

            const reqBody = mockProduct({
                price: +faker.number.int({ min: 1, max: 1000 }),
            });

            // Mock the repository method to simulate returning a empty product object from repository so we can test the service method
            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product));

            await expect(service.createProduct(reqBody)).rejects.toThrowError("Unable to create product");
        })
        test("product already exists", async () => {

            const service = new CatalogService(repository);

            const reqBody = mockProduct({
                price: +faker.number.int({ min: 1, max: 1000 }),
            });

            // Mock the repository method to simulate returning a empty product object from repository so we can test the service method
            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("Product already exists")));

            await expect(service.createProduct(reqBody)).rejects.toThrowError("Product already exists");
        })
    });

    describe.skip("updateProduct", () => {
        test("should update a product", async () => {
            const service = new CatalogService(repository);

            const reqBody = mockProduct({
                price: +faker.number.int({ min: 1, max: 1000 }),
                id: faker.number.int({ min: 1, max: 1000 }),
            });

            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        });


        test("should throw unable to update product error", async () => {

            const service = new CatalogService(repository);
            jest.spyOn(repository, "update").mockImplementationOnce( () => Promise.reject(new Error('Unable to update product')) );
            await expect(service.updateProduct({})).rejects.toThrow("Unable to update product");
        } )
    });

    describe("getProducts", () => { 

        test("should get products by offset and limit", async () => {

            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({ min: 1, max: 100 });
            const products = ProductFactory.buildList(randomLimit);

            jest.spyOn(repository, "find").mockImplementationOnce( () => Promise.resolve(products) );
            const results = await service.getProducts(randomLimit, 0);
            expect(results).toMatchObject(products);
            expect(results.length).toBe(randomLimit);

        });

      

    });


    describe("getProduct", () => { 

        test("should give single product detail by id", async () => {
            const  service = new CatalogService(repository);
            const product = ProductFactory.build();
            jest.spyOn(repository, "findOne").mockImplementationOnce( () => Promise.resolve(product) );
            const results = await service.getProduct(product.id!);
            expect(results).toMatchObject(product);

        })
    })


    describe("deleteProduct", () => {

        test("should delete a product", async () => {

            const service = new CatalogService(repository);
            const product = ProductFactory.build();
            jest.spyOn(repository, "delete").mockImplementationOnce( () => Promise.resolve({id: product.id!}) );
            const results = await service.deleteProduct(product.id!);
            console.log("-- delete id response --", results);
            
            expect(results).toMatchObject({id: product.id});

        })


     });





});