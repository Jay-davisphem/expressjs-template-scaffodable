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
const models_1 = require("../models");
const EmailService_1 = __importDefault(require("./EmailService"));
const config_1 = __importDefault(require("../config"));
class UserService {
    constructor(user, token) {
        this.user = user;
        this.token = token;
        this.saveEncryptedData = (userDetails, encryptedData, session) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userExists = yield this.user.findOne({ email: userDetails.email });
            if (userExists) {
                // If a token already exists, throw an error
                throw new Error(`User exists`);
            }
            const existingToken = yield ((_a = this.token) === null || _a === void 0 ? void 0 : _a.findOne({ email: userDetails.email }));
            if (existingToken) {
                // If a token already exists, throw an error
                throw new Error(`Token for the user with email ${userDetails.email} has already been created.`);
            }
            const token = yield ((_b = this.token) === null || _b === void 0 ? void 0 : _b.create({
                email: userDetails.email,
                token: encryptedData,
            }));
            return token;
        });
        this.createEmailService = (userDetails, encryptedData, callbackUrl) => __awaiter(this, void 0, void 0, function* () {
            return new EmailService_1.default('Account Initialization', 'Acount Initialization', 'Click the following link to complete your registration', userDetails.email, `${callbackUrl !== null && callbackUrl !== void 0 ? callbackUrl : config_1.default.BASE_URL + '/v1/complete-registration'}/${encryptedData}`);
        });
        this.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
            let user = new models_1.User(data);
            user = yield user.save();
        });
    }
}
exports.default = UserService;
