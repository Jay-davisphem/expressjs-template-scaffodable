"use strict";
/*
* Setup express server.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
// import BaseRouter from "@src/routes/api";
const Paths_1 = __importDefault(require("./routes/Paths"));
const config_1 = __importDefault(require("./config"));
const HTTPStatusCodes_1 = __importDefault(require("./common/utils/HTTPStatusCodes"));
const misc_1 = require("./config/misc");
const cors_1 = require("./common/middlewares/cors");
const rateLimiter_1 = __importDefault(require("./common/middlewares/rateLimiter"));
const fs_1 = require("fs");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import { PrismaClient } from "@prisma/client";
const misc_2 = require("./common/utils/misc");
// **** Variables **** //
const API_VERSION_STRING = '/' + Paths_1.default.Version1;
const app = (0, express_1.default)();
// const prisma = new PrismaClient();
// const io = new Server(createServer(app));
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// **** Setup **** //
// Basic middleware
app.use(cors_1.corsMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(config_1.default.CookieProps.Secret));
app.use(rateLimiter_1.default);
// Show routes called in console during development
if (config_1.default.NodeEnv === misc_1.NodeEnvs.Dev.valueOf()) {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (config_1.default.NodeEnv === misc_1.NodeEnvs.Production.valueOf()) {
    app.use((0, helmet_1.default)());
    app.use((err, req, res) => {
        // Log the error using morgan
        (0, morgan_1.default)('combined', {
            skip: (req, res) => res.statusCode < 400, // Skip logging non-error responses
            stream: process.stderr // Log errors to stderr
        })(req, res, err);
    });
}
// Add APIs, must be after middleware
// app.use(Paths.Base, BaseRouter);
// Add error handler
app.use((err, _, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (config_1.default.NodeEnv !== misc_1.NodeEnvs.Test.valueOf()) {
        console.error(err);
    }
    let status = HTTPStatusCodes_1.default.BAD_REQUEST;
    if ('status' in err) {
        status = err === null || err === void 0 ? void 0 : err.status;
    }
    return res.status(status).json({ error: err.message });
});
// Set static directory (js and css);
// const staticDir = path.join(__dirname, "public");
// app.use(express.static(staticDir));
// app.use("/uploads", express.static("./public/uploads"));
// Nav to users pg by default
app.get("/", (_, res) => {
    return res.send("WELCONE TO EXPRESSJS-TEMPLATE-SCAFFODABLE PROJECT");
});
//--- Serving swagger.yaml
app.get(`/api${API_VERSION_STRING}/docs/swagger.yaml`, (req, res) => {
    const swaggerFile = (0, fs_1.readFileSync)("./src/config/docs/swagger.yaml", "utf8");
    res.setHeader("Content-Type", "text/yaml");
    res.send(swaggerFile);
});
//--- Serving swaggerPath
app.use(`/api${API_VERSION_STRING}/docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup({}, {
    swaggerOptions: {
        url: `/api${API_VERSION_STRING}/docs/swagger.yaml`,
    },
}));
// Global Error Handling Middleware - 404 Not Found
app.use((req, res, next) => {
    res.status(HTTPStatusCodes_1.default.NOT_FOUND).json(new misc_2.ApiJsonData('error', "Route not found").valueOf());
});
// Global Error Handling Middleware - 405 Method Not Allowed
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err) {
//     res.status(HttpStatusCodes.METHOD_NOT_ALLOWED).json(new ApiJsonData('error', "Method Not Allowed").valueOf());
//   } else {
//     next();
//   }
// });
// **** Export default **** //
exports.default = app;
