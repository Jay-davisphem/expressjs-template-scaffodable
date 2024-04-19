"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catchable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HTTPStatusCodes_1 = __importDefault(require("../utils/HTTPStatusCodes"));
const misc_1 = require("../utils/misc");
function Catchable(useTransaction = false) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, ...args) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                let session;
                if (useTransaction) {
                    session = yield mongoose_1.default.startSession();
                    session.startTransaction();
                }
                try {
                    const result = yield originalMethod.apply(this, [req, res, ...args]);
                    if (useTransaction && session) {
                        yield session.commitTransaction();
                        session.endSession();
                    }
                    return result;
                }
                catch (error) {
                    if (useTransaction && session) {
                        yield session.abortTransaction();
                        session.endSession();
                    }
                    console.error(`Error occurred in ${String(propertyKey)}:`, error);
                    return res.status((_a = error === null || error === void 0 ? void 0 : error.statusCode) !== null && _a !== void 0 ? _a : HTTPStatusCodes_1.default.INTERNAL_SERVER_ERROR).json(new misc_1.ApiJsonData('error', error === null || error === void 0 ? void 0 : error.message));
                }
            });
        };
        return descriptor;
    };
}
exports.Catchable = Catchable;
