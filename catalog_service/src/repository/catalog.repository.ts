import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.modules";
import { PrismaClient } from "@prisma/client";
import { logger, NotFoundError } from "../utils";

export class CatalogRepository implements ICatalogRepository{

    _prisma: PrismaClient;
    
    constructor() {
        this._prisma = new PrismaClient();
    }

    create(data: Product): Promise<Product> {

        return this._prisma.product.create({
            data
        });

    };

    update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: { id: data.id },
            data
        })
    };

    delete(id: any): Promise<{id: number}> {
        return this._prisma.product.delete({
            where: { id }
        });
    }

    find(limit:number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset
           });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where : {id}
        });
        if(product) return Promise.resolve(product);
        logger.error(`Product with id ${id} not found`);
        throw new NotFoundError("product not found")
    }
    

}