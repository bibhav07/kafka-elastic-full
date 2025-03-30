import express, {Request, Response, NextFunction} from "express";
const router = express.Router();


router.post("/product", async ( req: Request , res: Response) => {
     res.status(200).json({ message: "Product created successfully" });
})




export default router;

