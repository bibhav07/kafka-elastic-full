import express from 'express';
import CatalogRouter from './api/catalog.routes';
import { HandleErrorWithLogger, httpLogger } from './utils';
const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/", CatalogRouter);

// Error-handling middleware should be placed after all other middleware and routes
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log("error ---- in handler");
	
	HandleErrorWithLogger(error, req, res, next);
    
});

export default app;