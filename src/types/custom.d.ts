import { Request } from 'express';
import { IUser } from '../models';

declare module 'express' {
    export interface Request {
        user?: IUser;
    }
}
