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
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
class EncryptionService {
    constructor(algorithm = 'aes-128-cbc', secretKey = config_1.default.Jwt.Secret) {
        this.algorithm = algorithm;
        this.secretKey = crypto_1.default.createHash('sha256').update(secretKey).digest();
    }
    static getInstance(algorithm, secretKey) {
        if (!EncryptionService.instance) {
            EncryptionService.instance = new EncryptionService(algorithm, secretKey);
        }
        return EncryptionService.instance;
    }
    encrypt(data) {
        const dataString = JSON.stringify(data);
        const iv = crypto_1.default.randomBytes(16);
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.secretKey, iv);
        let encryptedData = cipher.update(dataString, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return `${iv.toString('hex')}:${encryptedData}`;
    }
    decrypt(encryptedData) {
        const [ivHex, encryptedTextHex] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encryptedText = Buffer.from(encryptedTextHex, 'hex');
        const decipher = crypto_1.default.createDecipheriv(this.algorithm, this.secretKey, iv);
        let decryptedData = decipher.update(encryptedText);
        decryptedData = Buffer.concat([decryptedData, decipher.final()]);
        return JSON.parse(decryptedData.toString());
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Combine password with the secret key
            const combinedPassword = password + config_1.default.Jwt.Secret;
            // Generate a salt (bcrypt automatically generates one)
            const saltRounds = 12; // You can adjust the number of rounds for complexity
            const salt = yield bcryptjs_1.default.genSalt(saltRounds);
            // Hash the combined password with the salt
            const hash = yield bcryptjs_1.default.hash(combinedPassword, salt);
            return hash;
        });
    }
    comparePassword(inputPassword, storedHashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Combine the input password with the secret key
            const combinedPassword = inputPassword + config_1.default.Jwt.Secret;
            // Compare the combined password hash with the stored hash
            const match = yield bcryptjs_1.default.compare(combinedPassword, storedHashedPassword);
            return match; // Returns true if the passwords match, false otherwise
        });
    }
}
const encryptionServiceInstance = EncryptionService.getInstance('aes-256-cbc', config_1.default.Jwt.Secret);
exports.default = encryptionServiceInstance;
