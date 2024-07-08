import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import EnvVars from "../../config";
import HttpStatusCodes from "../utils/HTTPStatusCodes";
import { ApiJsonData } from "../utils/misc";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
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
        const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as JwtPayload

        // Attach the user information to the request object for further use
        req.user = decodedToken?.user;

        next();
    } catch (err) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json( new ApiJsonData('error', 'Unauthorized: Invalid token' ).valueOf());
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    // Make sure the user is authenticated first
    if (!req.user) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json( new ApiJsonData('error', 'Unauthorized: User not authenticated' ).valueOf());
    }

    if (req.user.role !== 'ADMIN') {
        return res.status(HttpStatusCodes.FORBIDDEN).json( new ApiJsonData('error', 'Forbidden: User not authorized' ).valueOf());
    }

    next();
}
