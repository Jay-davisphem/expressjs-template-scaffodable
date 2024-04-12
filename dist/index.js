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
require('module-alias/register');
require("./pre-start"); // Must be the first import
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./server"));
// import prisma from "./models/prisma";
// Just for testing, to be deleted
// query raw is calling postgres:5432 directly
// async function main() {
//   const currentDateFromDatabase = await prisma.$queryRaw`SELECT CURRENT_DATE`;
//   console.log("Current date from the database:", currentDateFromDatabase);
// }
// **** Run **** //
const SERVER_START_MSG = "Express server started on port: " + config_1.default.Port.toString();
const expressServer = server_1.default.listen(config_1.default.Port, () => __awaiter(void 0, void 0, void 0, function* () {
    //   logger.info(SERVER_START_MSG);
    console.log("started app on port ", config_1.default.Port);
    // try {
    //   await main();
    // } catch (err) {
    //   console.error(err);
    // }
}));
function handleTerminationSignal(signal_1) {
    return __awaiter(this, arguments, void 0, function* (signal, server = expressServer) {
        console.log(`Received ${signal} signal. Closing server and disconnecting from the database...`);
        server.close();
        //   await prisma.$disconnect();
        process.exit(0);
    });
}
process.on("SIGINT", () => handleTerminationSignal("SIGINT"));
process.on("SIGTERM", () => handleTerminationSignal("SIGTERM"));
