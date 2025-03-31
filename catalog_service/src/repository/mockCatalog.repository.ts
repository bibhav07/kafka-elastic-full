import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.modules";

//this is a mock repository that implements the ICatalogRepository interface
//this is used to test the service without having to connect to a real database

export class MockCatalogRepository implements ICatalogRepository {
  create(data: any): Promise<any> {
    return Promise.resolve({
      id: Math.floor(Math.random() * 1000),
      ...data,
    }); 
  }

  update(data: any): Promise<any> {
    return Promise.resolve(data as Product);
  }

  delete(id: any): Promise<any> {
    return Promise.resolve({ id });
  }

  find(limit:number, offset:number): Promise<any[]> {
    return Promise.resolve([]);
  }

  findOne(id: any): Promise<any> {
    return Promise.resolve({ id });
  }
}