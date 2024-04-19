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
const RoleEnum_1 = __importDefault(require("../models/enums/RoleEnum"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EncryptionService_1 = __importDefault(require("../services/EncryptionService"));
const mongoose_1 = __importDefault(require("mongoose"));
const HTTPStatusCodes_1 = __importDefault(require("../common/utils/HTTPStatusCodes"));
const misc_1 = require("../common/utils/misc");
const PermissionEnum_1 = __importDefault(require("../models/enums/PermissionEnum"));
const config_1 = __importDefault(require("../config"));
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.initiateRegistration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // encrypt userDetails
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            const userDetails = req.body;
            try {
                const encryptedData = EncryptionService_1.default.encrypt(userDetails);
                // Generate securityCode encrypt, save and pass it to emailService
                const securityCode = '';
                yield this.userService.saveEncryptedData(userDetails, encryptedData, securityCode);
                const callbackUrl = req.params.callbackUrl;
                const emailService = yield this.userService.createEmailService(userDetails, encryptedData, securityCode, callbackUrl);
                const eRes = yield emailService.sendEmail();
                console.log(eRes);
                yield session.commitTransaction();
                session.endSession();
                res.status(HTTPStatusCodes_1.default.OK).json(new misc_1.ApiJsonData('success', eRes, eRes));
            }
            catch (err) {
                yield session.abortTransaction();
                session.endSession();
                res.status(HTTPStatusCodes_1.default.INTERNAL_SERVER_ERROR).json(new misc_1.ApiJsonData('error', 'Error', { error: err }));
            }
        });
        this.getEncryptedData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { encryptedData, securityCode } = req.body;
                if (!securityCode) {
                    throw new Error("Invalid Security Code! Please provide security code sent via email.");
                }
                const token = yield models_1.Token.findOne({ token: encryptedData });
                // Check if the encryptedData exists and if the token is valid
                if (!encryptedData || !token) {
                    throw new Error("Invalid Token");
                }
                const isValidSecurityCode = yield EncryptionService_1.default.comparePassword(securityCode, token.securityCode);
                if (!isValidSecurityCode) {
                    throw new Error('Invalid Security Code.');
                }
                // Decrypt the encrypted data
                let data = EncryptionService_1.default.decrypt(encryptedData);
                return res.status(HTTPStatusCodes_1.default.OK).json(new misc_1.ApiJsonData('success', 'Data decoded', data).valueOf());
            }
            catch (err) {
                // Handle specific error messages
                if (err.message.startsWith('Invalid')) {
                    return res.status(HTTPStatusCodes_1.default.BAD_REQUEST).json(new misc_1.ApiJsonData('error', err.message).valueOf());
                }
                // Handle generic internal server errors
                res.status(HTTPStatusCodes_1.default.INTERNAL_SERVER_ERROR).json(new misc_1.ApiJsonData('error', err.message));
            }
        });
        this.completeRegistration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { encryptedData, securityCode } = req.body;
                if (!securityCode) {
                    throw new Error("Please provide security code sent via email.");
                }
                const token = yield models_1.Token.findOne({ token: encryptedData });
                // Check if the encryptedData exists and if the token is valid
                if (!encryptedData || !token) {
                    throw new Error("Invalid Token");
                }
                // Decrypt the encrypted data
                let data = EncryptionService_1.default.decrypt(encryptedData);
                console.log('decrypted data', data);
                // Merge request body data with decrypted data
                // If a key exists in both, the request body data takes precedence
                const requestBodyData = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) || {};
                data = Object.assign(Object.assign({}, data), requestBodyData);
                // Encrypt the password and update the data object
                if (data === null || data === void 0 ? void 0 : data.password) {
                    const encryptedPassword = yield EncryptionService_1.default.encryptPassword(data.password);
                    data.password = encryptedPassword;
                }
                else {
                    throw new Error("No Password");
                }
                if (!(data === null || data === void 0 ? void 0 : data.role)) {
                    data.role = RoleEnum_1.default.AUTH_USER;
                }
                if (!(data === null || data === void 0 ? void 0 : data.permissions)) {
                    data.permissions = PermissionEnum_1.default.getNormalUserDefault();
                }
                // Create the user
                yield this.userService.createUser(data);
                yield token.deleteOne();
                // Send a success response
                res.status(HTTPStatusCodes_1.default.CREATED).json(new misc_1.ApiJsonData('success', 'User created successfully'));
            }
            catch (err) {
                console.error('error', err);
                // Handle specific error messages
                if (err.message === 'Invalid Token' || err.message === 'No Password') {
                    return res.status(HTTPStatusCodes_1.default.BAD_REQUEST).json(new misc_1.ApiJsonData('error', err.message).valueOf());
                }
                // Handle generic internal server errors
                res.status(HTTPStatusCodes_1.default.INTERNAL_SERVER_ERROR).json(new misc_1.ApiJsonData('error', err.message));
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // login based on role and return jwt token
            try {
                const user = yield models_1.User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(HTTPStatusCodes_1.default.NOT_FOUND).json(new misc_1.ApiJsonData('error', 'User Not found').valueOf());
                }
                const pwdIsValid = yield EncryptionService_1.default.comparePassword(req.body.password, user.password);
                console.log('pwdIsValid', pwdIsValid);
                if (!pwdIsValid) {
                    return res.status(HTTPStatusCodes_1.default.UNAUTHORIZED).json(new misc_1.ApiJsonData('error', 'Invalid Password').valueOf());
                }
                const jwtToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.Jwt.Secret, { expiresIn: 86400 });
                console.log('jwtTokenUser', jwtToken, user);
                return res.status(HTTPStatusCodes_1.default.OK).json(new misc_1.ApiJsonData('success', 'Login successfull', { user, accessToken: jwtToken }).valueOf());
            }
            catch (err) {
                return res.status(HTTPStatusCodes_1.default.INTERNAL_SERVER_ERROR).json(new misc_1.ApiJsonData('error', err === null || err === void 0 ? void 0 : err.message));
            }
        });
    }
}
exports.default = UserController;
