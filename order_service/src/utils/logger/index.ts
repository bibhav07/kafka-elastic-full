import pino from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    base: {
        serviceName : "order_service",
    },
    serializers: pino.stdSerializers,
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
        level: "error"
    },
});



export const httpLogger = pinoHttp({
    logger, 
    level: process.env.LOG_LEVEL || "error",
});