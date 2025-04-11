import express, { Request, Response, NextFunction} from 'express';
import * as service from '../service/cart.service';
import * as repository from '../repository/cart.repository';
import { ValidateRequest } from '../utils/error/validators';
import { CartRequestInput, CartRequestSchema } from '../dto/cartRequest.dto';

const router = express.Router();
const repo = repository.CartRepository

router.post('/cart', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const error = ValidateRequest<CartRequestInput>(req.body, CartRequestSchema);
        if (error) {
             res.status(400).json({ message: 'Bad Request', error });
             return;
        }
        
        const input: CartRequestInput = req.body;   
        const cart = await service.CreateCart(input, repo)
        res.status(200).json({ message: 'POST cart', cart });
    } catch (error) {
        next(error);
    }
});


router.get('/cart', async (req: Request, res: Response, next: NextFunction) => {
    const cart = await service.GetCart(req.body.customerId, repo);
    res.status(200).json({ message: 'GET cart', cart });
});


router.patch('/cart/:id', async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = parseInt(req.params.id);
    const cart = await service.EditCart({id: lineItemId, qty: req.body.qty}, repo);
    res.status(200).json({ message: 'PATCH cart', cart });
});


router.delete('/cart/:lineItemId', (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = parseInt(req.params.lineItemId);
    const cart = service.DeleteCart( lineItemId,repo);
    res.status(200).json({ message: 'DELETE cart', cart });
});


export default router; 