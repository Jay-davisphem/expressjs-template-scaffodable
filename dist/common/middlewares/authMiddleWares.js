"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const HTTPStatusCodes_1 = __importDefault(require("../utils/HTTPStatusCodes"));
const misc_1 = require("../utils/misc");
function isAuthenticated(req, res, next) {
    // Retrieve the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If there's no Authorization header or it doesn't start with "Bearer ", respond with an Unauthorized status
        return res.status(401).json({ error: 'Unauthorized: No token provided or invalid format' });
    }
    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    try {
        // Verify the token using the secret key from your configuration
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.Jwt.Secret);
        // Attach the user information to the request object for further use
        req.user = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.user;
        next();
    }
    catch (err) {
        return res.status(HTTPStatusCodes_1.default.UNAUTHORIZED).json(new misc_1.ApiJsonData('error', 'Unauthorized: Invalid token').valueOf());
    }
}
exports.isAuthenticated = isAuthenticated;
function isAdmin(req, res, next) {
    // Make sure the user is authenticated first
    if (!req.user) {
        return res.status(HTTPStatusCodes_1.default.UNAUTHORIZED).json(new misc_1.ApiJsonData('error', 'Unauthorized: User not authenticated').valueOf());
    }
    if (req.user.role !== 'ADMIN') {
        return res.status(HTTPStatusCodes_1.default.FORBIDDEN).json(new misc_1.ApiJsonData('error', 'Forbidden: User not authorized').valueOf());
    }
    next();
}
exports.isAdmin = isAdmin;
