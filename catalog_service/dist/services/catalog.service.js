"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    constructor(repository) {
        //initialize the repository type, this is a dependency injection 
        //so both the service and repository are decoupled from each other
        //this allows us to use any repository that implements the ICatalogRepository interface
        //this is a good practice to follow in order to make the code more testable and maintainable
        this._repository = repository;
    }
    createProduct(input) { }
    ;
    updateProduct(input) { }
    ;
    getProducts(limit, offset) { }
    ;
    getProduct(id) { }
    ;
    deleteProduct(id) { }
    ;
}
exports.CatalogService = CatalogService;
