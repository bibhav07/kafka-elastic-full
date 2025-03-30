"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCatalogRepository = void 0;
//this is a mock repository that implements the ICatalogRepository interface
//this is used to test the service without having to connect to a real database
class MockCatalogRepository {
    create(data) {
        return Promise.resolve(data);
    }
    update(data) {
        return Promise.resolve(data);
    }
    delete(id) {
        return Promise.resolve({ id });
    }
    find() {
        return Promise.resolve([]);
    }
    findOne(id) {
        return Promise.resolve({ id });
    }
}
exports.MockCatalogRepository = MockCatalogRepository;
