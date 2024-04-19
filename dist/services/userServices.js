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
const EmailService_1 = __importDefault(require("./EmailService"));
class UserService {
    constructor(user, token) {
        this.user = user;
        this.token = token;
        this.saveEncryptedData = (userDetails, encryptedData) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(userDetails, 'userDetails');
            const token = yield ((_a = this.token) === null || _a === void 0 ? void 0 : _a.create({
                email: userDetails.email,
                token: encryptedData,
            }));
            return token;
        });
        this.createEmailService = (userDetails, encryptedData) => __awaiter(this, void 0, void 0, function* () {
            return new EmailService_1.default('Account Initialization', 'Acount Initialization', 'Click the following link to complete your registration', userDetails.email, `http://localhost.com/api/v1/complete-registration/${encryptedData}`);
        });
    }
}
exports.default = UserService;
