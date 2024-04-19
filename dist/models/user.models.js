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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PermissionEnum_1 = __importDefault(require("./enums/PermissionEnum"));
const schemaUtils_1 = require("../common/utils/schemaUtils");
const RoleEnum_1 = __importDefault(require("./enums/RoleEnum"));
const commonDict = { type: String, required: true };
const userSchemaFields = {
    username: Object.assign(Object.assign({}, commonDict), { unique: true }),
    password: { type: String },
    firstName: commonDict,
    lastName: commonDict,
    phone: commonDict,
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    permissions: [{ type: String, enum: Object.values(PermissionEnum_1.default), default: PermissionEnum_1.default.getNormalUserDefault(),
            required: [true, "Please specify user permission"],
        }],
    role: {
        type: String, enum: Object.values(RoleEnum_1.default), default: RoleEnum_1.default.GUEST,
        required: [true, "Please specify user role"]
    }
};
const userSchema = new mongoose_1.Schema(userSchemaFields, { versionKey: false, timestamps: true });
(0, schemaUtils_1.generateToJSONMethod)(userSchema);
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
