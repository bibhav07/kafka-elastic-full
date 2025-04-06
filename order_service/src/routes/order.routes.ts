import express, { Request, Response, NextFunction} from 'express';

const router = express.Router();


router.post('/order', (req: Request, res: Response, next: NextFunction) => {
    const { items } = req.body; 
    res.status(200).json({ message: 'POST order', items });
});


router.get('/order', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'GET order' });
});


router.get('/order/:id', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    res.status(200).json({ message: 'GET order', id });
});



router.delete('/order', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'DELETE order' });
});

router.delete('/order/:id', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    res.status(200).json({ message: 'DELETE order', id });
});

export default router; 