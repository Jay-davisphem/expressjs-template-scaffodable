import { Response, Request } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import HttpStatusCodes from '../utils/HTTPStatusCodes';
import { ApiJsonData } from '../utils/misc';

export function Catchable(useTransaction = false): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, ...args: any[]) {
            let session: ClientSession | undefined;

            if (useTransaction) {
                session = await mongoose.startSession();
                session.startTransaction();
            }

            try {
                const result = await originalMethod.apply(this, [req, res, ...args]);

                if (useTransaction && session) {
                    await session.commitTransaction();
                    session.endSession();
                }
                return result;
            } catch (error: any) {
                if (useTransaction && session) {
                    await session.abortTransaction();
                    session.endSession();
                }
                console.error(`Error occurred in ${String(propertyKey)}:`, error);
                return res.status(error?.statusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new ApiJsonData('error', error?.message));
            }
        };

        return descriptor;
    };
}
