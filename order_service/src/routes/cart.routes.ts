import express, { Request, Response, NextFunction} from 'express';
import * as service from '../service/cart.service';
import * as repository from '../repository/cart.repository';

const router = express.Router();
const repo = repository.CartRepository

router.post('/cart', async (req: Request, res: Response, next: NextFunction) => {

    const cart = await service.CreateCart(req.body, repo)
    res.status(200).json({ message: 'POST cart', cart });
});


router.get('/cart', async (req: Request, res: Response, next: NextFunction) => {
    const cart = await service.GetCart(req.body, repo);
    res.status(200).json({ message: 'GET cart', cart });
});


router.patch('/cart', async (req: Request, res: Response, next: NextFunction) => {
  
    const cart = await service.EditCart(req.body, repo);
    res.status(200).json({ message: 'PATCH cart', cart });
});


router.delete('/cart/:id', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const cart = service.DeleteCart(id,repo);
    res.status(200).json({ message: 'DELETE cart', cart });
});


export default router; 