"use strict";
/**
 * Environments variables declared here.
 */
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
exports.default = {
    NodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "",
    Port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0,
    CookieProps: {
        Key: "ExpressGeneratorTs",
        Secret: (_c = process.env.COOKIE_SECRET) !== null && _c !== void 0 ? _c : "",
        // Casing to match express cookie options
        Options: {
            httpOnly: true,
            signed: true,
            path: (_d = process.env.COOKIE_PATH) !== null && _d !== void 0 ? _d : "",
            maxAge: Number((_e = process.env.COOKIE_EXP) !== null && _e !== void 0 ? _e : 0),
            domain: (_f = process.env.COOKIE_DOMAIN) !== null && _f !== void 0 ? _f : "",
            secure: process.env.SECURE_COOKIE === "true",
        },
    },
    Jwt: {
        Secret: (_g = process.env.JWT_SECRET) !== null && _g !== void 0 ? _g : "",
        Exp: (_h = process.env.COOKIE_EXP) !== null && _h !== void 0 ? _h : "", // exp at the same time as the cookie
    },
};
