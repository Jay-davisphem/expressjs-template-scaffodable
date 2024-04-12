/* 
* Setup express server.
 */

// import cookieParser from "cookie-parser";
import morgan from "morgan";
// import path from "path";
// import helmet from "helmet";
import express, {
  Request,
  Response,
  NextFunction,
  // RequestHandler,
} from "express";
// import log from "@src/logger";
import "express-async-errors";

// import BaseRouter from "@src/routes/api";
import Paths from "./routes/Paths";

import EnvVars from "./config";
// import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { NodeEnvs } from "./config/misc";
// import { RouteError } from "@src/other/classes";

// import { corsMiddleware } from "./middlewares/cors";
// import limiter from "./middlewares/rateLimiting";

// import { readFileSync } from "fs";
// import swaggerUi from "swagger-ui-express";

// import passport from "passport";

// import { PrismaClient } from "@prisma/client";
// import { env } from "process";
// import { ApiJsonData } from "./util/misc";
// import { Server } from 'socket.io';
import { createServer } from 'node:http';

// **** Variables **** //

const API_VERSION_STRING = Paths.Version1;

const app = express();

// const prisma = new PrismaClient();

// const io = new Server(createServer(app));
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// **** Setup **** //

// Basic middleware
// app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser(EnvVars.CookieProps.Secret));

// app.use(limiter);

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
} 

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
//   app.use(helmet());
  app.use(morgan('combined'));

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
app.get("/", (_: Request, res: Response) => {
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

export default app;
