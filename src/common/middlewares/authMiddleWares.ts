import { NextFunction, Response, Request } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    next()
}

export function isAdmin(req: Request, res: Response, next: NextFunction){
    next()
}