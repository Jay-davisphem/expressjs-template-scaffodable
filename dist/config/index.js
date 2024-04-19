"use strict";
/**
 * Environments variables declared here.
 */
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
exports.default = {
    NodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "",
    Port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0,
    BASE_URL: (_c = process.env.BASE_URL) !== null && _c !== void 0 ? _c : '',
    MONGO_URI: process.env.MONGO_URI,
    EXPIRES_DURATION: (_d = process.env.EXPIRES_DURATION) !== null && _d !== void 0 ? _d : '12h',
    GOOGLE_ACCESS_TOKEN: (_e = process.env.GOOGLE_ACCESS_TOKEN) !== null && _e !== void 0 ? _e : '',
    GOOGLE_REFRESH_TOKEN: (_f = process.env.GOOGLE_REFRESH_TOKEN) !== null && _f !== void 0 ? _f : '',
    OAUTH_CLIENT_SECRET: (_g = process.env.OAUTH_CLIENT_SECRET) !== null && _g !== void 0 ? _g : '',
    OAUTH_CLIENT_ID: (_h = process.env.OAUTH_CLIENT_ID) !== null && _h !== void 0 ? _h : '',
    ADMIN_MAIL: "davidoluwafemi178@gmail.com",
    CookieProps: {
        Key: "ExpressGeneratorTs",
        Secret: (_j = process.env.COOKIE_SECRET) !== null && _j !== void 0 ? _j : "",
        // Casing to match express cookie options
        Options: {
            httpOnly: true,
            signed: true,
            path: (_k = process.env.COOKIE_PATH) !== null && _k !== void 0 ? _k : "",
            maxAge: Number((_l = process.env.COOKIE_EXP) !== null && _l !== void 0 ? _l : 0),
            domain: (_m = process.env.COOKIE_DOMAIN) !== null && _m !== void 0 ? _m : "",
            secure: process.env.SECURE_COOKIE === "true",
        },
    },
    Jwt: {
        Secret: (_o = process.env.SECRET_KEY) !== null && _o !== void 0 ? _o : "eba9591cba4fec43ef5d4793901c040e90d3cd5ad298be217776e41bd5b477dc1b3afa57ab96aee95ca97620556ca176f3252722275b8b895bf56b82b02b6fd3",
        Exp: (_p = process.env.COOKIE_EXP) !== null && _p !== void 0 ? _p : "", // exp at the same time as the cookie
    },
};
