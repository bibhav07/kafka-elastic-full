"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const expressApp_1 = __importDefault(require("./expressApp"));
const PORT = process.env.PORT || 3000;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    expressApp_1.default.listen(PORT, () => {
        console.log(`Catalog service is running on port ${PORT}`);
    });
    process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error.message);
        process.exit(1); // Exit the process with a failure code        
    });
    //this is a signal handler that will be called when the process receives a SIGINT signal (Ctrl + C)
    //this is used to gracefully shutdown the server and close all connections
    process.on("SIGINT", () => {
        console.log("Catalog service is shutting down....");
        process.exit(0);
    });
});
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => {
    console.log("Catalog service started successfully");
});
