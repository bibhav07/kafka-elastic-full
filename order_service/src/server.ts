import expressApp from "./express-app";
import { logger } from "./utils/logger";
const PORT = process.env.APP_PORT || 9000;

export const StartServer =async () => {
    expressApp.listen(PORT, () => {
        logger.info(`App is listening to -: ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        process.exit(1);
    });
};

StartServer().then( () => {
    logger.info('server is up....');
    
})