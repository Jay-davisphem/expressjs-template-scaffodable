"use strict";
/*
* Setup express server.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import path from "path";
// import helmet from "helmet";
const express_1 = __importDefault(require("express"));
// import logger from "jet-logger";
// import log from "@src/logger";
require("express-async-errors");
// import BaseRouter from "@src/routes/api";
const Paths_1 = __importDefault(require("./routes/Paths"));
const config_1 = __importDefault(require("./config"));
// import HttpStatusCodes from "@src/constants/HttpStatusCodes";
const misc_1 = require("./config/misc");
// **** Variables **** //
const API_VERSION_STRING = Paths_1.default.Version1;
const app = (0, express_1.default)();
// const prisma = new PrismaClient();
// const io = new Server(createServer(app));
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// **** Setup **** //
// Basic middleware
// app.use(corsMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cookieParser(EnvVars.CookieProps.Secret));
// app.use(limiter);
// Show routes called in console during development
if (config_1.default.NodeEnv === misc_1.NodeEnvs.Dev.valueOf()) {
    //   app.use(morgan("dev"));
}
// Security
if (config_1.default.NodeEnv === misc_1.NodeEnvs.Production.valueOf()) {
    //   app.use(helmet());
}
// Add APIs, must be after middleware
// app.use(Paths.Base, BaseRouter);
// Add error handler
// app.use(
//   (
//     err: Error,
//     _: Request,
//     res: Response,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     next: NextFunction,
//   ) => {
//     if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
//       logger.err(err, true);
//     }
//     let status = HttpStatusCodes.BAD_REQUEST;
//     if (err instanceof RouteError) {
//       status = err.status;
//     }
//     return res.status(status).json({ error: err.message });
//   },
// );
// ** Front-End Content ** //
// Set views directory (html)
// const viewsDir = path.join(__dirname, "views");
// app.set("views", viewsDir);
// // Set static directory (js and css).
// const staticDir = path.join(__dirname, "public");
// app.use(express.static(staticDir));
// app.use("/uploads", express.static("./public/uploads"));
// Nav to users pg by default
app.get("/", (_, res) => {
    return res.send("WELCONE TO EXPRESSJS-TEMPLATE-SCAFFODABLE PROJECT");
});
//--- Serving swagger.yaml
// app.get(
//   `/api${API_VERSION_STRING}/docs/swagger.yaml`,
//   (req: Request, res: Response) => {
//     const swaggerFile = readFileSync("./src/other/swagger.yaml", "utf8");
//     res.setHeader("Content-Type", "text/yaml");
//     res.send(swaggerFile);
//   },
// );
//--- Serving swaggerPath
// app.use(
//   `/api${API_VERSION_STRING}/docs`,
//   swaggerUi.serve,
//   swaggerUi.setup(
//     {},
//     {
//       swaggerOptions: {
//         url: `/api${API_VERSION_STRING}/docs/swagger.yaml`,
//       },
//     },
//   ),
// );
// Global Error Handling Middleware - 404 Not Found
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(HttpStatusCodes.NOT_FOUND).json(new ApiJsonData('error', "Route not found").valueOf());
// });
// // Global Error Handling Middleware - 405 Method Not Allowed
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err) {
//     res.status(HttpStatusCodes.METHOD_NOT_ALLOWED).json(new ApiJsonData('error', "Method Not Allowed").valueOf());
//   } else {
//     next();
//   }
// });
// **** Export default **** //
exports.default = app;
