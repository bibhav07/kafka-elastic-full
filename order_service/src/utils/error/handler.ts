import {Request, Response, NextFunction} from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";


export const HandleErrorWithLogger = (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {

        //using reportError to determine if we need to log the error or not.
        let reportError = true;
        let status = 500;
        let data = error.message;

        [NotFoundError, ValidationError, AuthorizeError].forEach( (typeError) => {
            if (error instanceof typeError) {
                reportError = false;
                status = error.status;
                data = error.message;
            }
        });

        if (reportError) {
            //logging the error
            logger.error("Error: ", error.message);
        }else {
            //loggin as warn
            logger.warn("Error: ", error.message);
        }


        res.status(status).json({message: data, status});
        return;

}


export const HandleUnCaughtException = async (
    error: Error,
 ) => {
    // error report / monitoring tools
    logger.error(error);
    // recover
    process.exit(1);
 };