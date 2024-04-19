"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const schemaUtils_1 = require("../common/utils/schemaUtils");
const tokenSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    securityCode: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now, expires: config_1.default.EXPIRES_DURATION }
}, { versionKey: false, timestamps: true });
(0, schemaUtils_1.generateToJSONMethod)(tokenSchema);
const Token = mongoose_1.default.model('Token', tokenSchema);
exports.Token = Token;
