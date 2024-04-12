"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customCorsMiddleware = exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
// Enable CORS for all routes
exports.corsMiddleware = (0, cors_1.default)();
// Enable CORS with specific options
const customCorsMiddleware = (url) => (0, cors_1.default)({
    origin: url, // specify the allowed origin(s) or use a function for dynamic origin determination
    methods: ["GET", "POST", "PUT", "DELETE"], // specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // specify allowed headers
    preflightContinue: false, // disable preflight OPTIONS handling
});
exports.customCorsMiddleware = customCorsMiddleware;
