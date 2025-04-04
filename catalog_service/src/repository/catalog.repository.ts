import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.modules";

export class CatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<{id: number}> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    

}