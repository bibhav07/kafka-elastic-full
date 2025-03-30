import { ICatalogRepository } from "../interface/catalogRepository.interface";

//this is a mock repository that implements the ICatalogRepository interface
//this is used to test the service without having to connect to a real database

export class MockCatalogRepository implements ICatalogRepository {
  create(data: any): Promise<any> {
    return Promise.resolve(data);
  }

  update(data: any): Promise<any> {
    return Promise.resolve(data);
  }

  delete(id: any): Promise<any> {
    return Promise.resolve({ id });
  }

  find(): Promise<any[]> {
    return Promise.resolve([]);
  }

  findOne(id: any): Promise<any> {
    return Promise.resolve({ id });
  }
}