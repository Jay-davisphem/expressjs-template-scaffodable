import cors from "cors";
import { RequestHandler } from "express";

// Enable CORS for all routes
export const corsMiddleware: RequestHandler = cors();

// Enable CORS with specific options
export const customCorsMiddleware: (url: string) => RequestHandler = (
  url: string,
) =>
  cors({
    origin: url, // specify the allowed origin(s) or use a function for dynamic origin determination
    methods: ["GET", "POST", "PUT", "DELETE"], // specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // specify allowed headers
    preflightContinue: false, // disable preflight OPTIONS handling
  });
