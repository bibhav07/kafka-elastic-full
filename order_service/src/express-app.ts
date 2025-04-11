import express, { NextFunction, Request, Response } from "express";
import cors  from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { httpLogger } from "./utils/logger";
import { HandleErrorWithLogger } from "./utils/error/handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use(cartRoutes);
app.use(orderRoutes);


app.use("/", (req: Request, res: Response, _ : NextFunction) => {
     res.status(200).json({message: "working fine.."})
     return;
});


app.use(HandleErrorWithLogger);

export default app;