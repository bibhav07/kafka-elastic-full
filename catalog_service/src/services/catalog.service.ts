import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;
    constructor( repository: ICatalogRepository ){
        //initialize the repository type, this is a dependency injection 
        //so both the service and repository are decoupled from each other
        //this allows us to use any repository that implements the ICatalogRepository interface
        //this is a good practice to follow in order to make the code more testable and maintainable
        this._repository = repository;   
    }


    createProduct(input: any){};
    updateProduct(input: any){};
    getProducts(limit: number, offset: number){};
    getProduct(id: number){};
    deleteProduct(id: any){};

}