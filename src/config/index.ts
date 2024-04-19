/**
 * Environments variables declared here.
 */


import 'module-alias/register';

export default {
    NodeEnv: process.env.NODE_ENV ?? "",
    Port: process.env.PORT ?? 0,
    BASE_URL: process.env.BASE_URL ?? '',
    MONGO_URI: process.env.MONGO_URI as string,
    EXPIRES_DURATION: process.env.EXPIRES_DURATION ?? '12h',
    GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN ?? '',
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN ?? '',
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET ?? '',
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID ?? '',
    ADMIN_MAIL: "davidoluwafemi178@gmail.com",
    CookieProps: {
      Key: "ExpressGeneratorTs",
      Secret: process.env.COOKIE_SECRET ?? "",
      // Casing to match express cookie options
      Options: {
        httpOnly: true,
        signed: true,
        path: process.env.COOKIE_PATH ?? "",
        maxAge: Number(process.env.COOKIE_EXP ?? 0),
        domain: process.env.COOKIE_DOMAIN ?? "",
        secure: process.env.SECURE_COOKIE === "true",
      },
    },
    Jwt: {
      Secret: process.env.SECRET_KEY ?? "eba9591cba4fec43ef5d4793901c040e90d3cd5ad298be217776e41bd5b477dc1b3afa57ab96aee95ca97620556ca176f3252722275b8b895bf56b82b02b6fd3",
      Exp: process.env.COOKIE_EXP ?? "", // exp at the same time as the cookie
    },
  } as const;
  