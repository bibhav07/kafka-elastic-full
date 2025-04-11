import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { NotFoundError } from "../utils";

export class CatalogService {

    private _repository: ICatalogRepository;
    constructor( repository: ICatalogRepository ){
        //initialize the repository type, this is a dependency injection 
        //so both the service and repository are decoupled from each other
        //this allows us to use any repository that implements the ICatalogRepository interface
        //this is a good practice to follow in order to make the code more testable and maintainable
        this._repository = repository;   
    }


    async createProduct(input: any){

        const data = await this._repository.create(input);

        if(!data.id){
            throw new Error("Unable to create product");
        }
        return data;

    };
    async updateProduct(input: any){
        const data = await this._repository.update(input);

        if(!data.id){
            throw new Error("Unable to update product");
        }
        return data;
    };
    async getProducts(limit: number, offset: number){
        const products = await this._repository.find(limit, offset);
        return products;
    };
    async getProduct(id: number){
        // const product = await this._repository.findOne(id);
        // console.log("get product id", product);
        
        // if(!product.id){
        //     throw new NotFoundError("product not found")
            
        // }
        // return product;
        console.log("in here baby", id)
        throw new NotFoundError("product not found here")

    };
    
    async deleteProduct(id: any){
        const data = await this._repository.delete(id);
        console.log("delete product id", data);

        if(!data.id){
            throw new Error("Unable to delete product");
        }
        return data;
    };

}