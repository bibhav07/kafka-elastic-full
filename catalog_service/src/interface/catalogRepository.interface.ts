import { Product } from "../models/product.modules";

export interface ICatalogRepository {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any): Promise<{}>;
    find(): Promise<Product[]>;
    findOne(id: any): Promise<Product>
}