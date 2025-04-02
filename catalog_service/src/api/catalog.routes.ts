import express, { Request, Response, NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { RequestValidator } from "../utils/fixtures/requestValidators";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

// POST /products - Create a new product
router.post(
    "/products",
    async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            
            const {errors, input} = await RequestValidator(CreateProductRequest, req.body);
            if(errors) return res.status(400).json(errors);
            const data = await catalogService.createProduct(input);
            return res.status(201).json(data); 
        
        } catch (error) {
            const err = error as Error;
            return res.status(500).json(err.message);
        }
    }
);


router.patch("/products/:id", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
     try {
         const {errors, input} = await RequestValidator(UpdateProductRequest, req.body);
         const id = parseInt(req.params.id) || 0;
 
         if(errors) return res.status(400).json(errors);
 
         const data = await catalogService.updateProduct({id, ...input})
         return res.status(200).json(data);
 
     } catch (error) {
         const err = error as Error;
         return res.status(500).json(err.message); 
     }
 } )



router.get("/products", async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
     try {

          const limit = Number(req.query['limit']);
          const offset = Number(req.query['offset']);

          const result = await catalogService.getProducts(limit, offset);
          return res.status(200).json(result);
          
     } catch (error) {
          const err = error as Error;
          return res.status(500).json(err.message);
     }
}  )

//fetch single products
router.get("/product/:id", async (req: Request, res: Response, next: NextFunction) :Promise<any>=> {
     const id = parseInt(req.params.id) || 0;
     
     try {
         const result = await catalogService.getProduct(id);
         return res.status(200).json(result);
     } catch (error) {
         const err = error as Error;
         return res.status(500).json(err.message);
     }
 });
 
 router.delete("/product/:id",   async (req: Request, res: Response, next: NextFunction) : Promise<any>=> {
     const id = parseInt(req.params.id) || 0;
     try {
         const result = await catalogService.deleteProduct(id);
         return res.status(200).json(result);
     } catch (error) {
         const err =  error as Error;
         return res.status(500).json(err.message);
     }
 } )



export default router;

