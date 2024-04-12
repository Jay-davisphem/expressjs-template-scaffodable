"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOneLevelDeepObject = exports.normalizeTwoLevelsDeepObject = exports.ApiJsonData = exports.generateOTP = exports.tick = exports.getRandomInt = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Miscellaneous shared functions go here.
 */
/**
 * Get a random number between 1 and 1,000,000,000,000
 */
function getRandomInt() {
    return Math.floor(Math.random() * 1000000000000);
}
exports.getRandomInt = getRandomInt;
/**
 * Wait for a certain number of milliseconds.
 */
function tick(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
exports.tick = tick;
function generateOTP(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, characters.length);
        otp += characters.charAt(randomIndex);
    }
    return otp;
}
exports.generateOTP = generateOTP;
class ApiJsonData {
    constructor(status, message, data) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
    valueOf() {
        return {
            data: this.data,
            status: this.status,
            message: this.message
        };
    }
}
exports.ApiJsonData = ApiJsonData;
/**
 * Normalize the values two levels deep into an array
 * @param nestedObjectArray The array with nested objects
 * @param keyOne Key for the object on the first level
 * @param keyTwo Key for the object on the second level
 * @returns An array of the values at keyTwo
 */
const normalizeTwoLevelsDeepObject = (nestedObjectArray, keyOne, keyTwo) => {
    return nestedObjectArray.map(element => {
        return element[keyOne][keyTwo];
    });
};
exports.normalizeTwoLevelsDeepObject = normalizeTwoLevelsDeepObject;
/**
 * Normalize the values one level deep into an array
 * @param nestedObjectArray The array with nested objects
 * @param keyOne Key for the object on the first level
 * @returns An array of the values at keyOne
 */
const normalizeOneLevelDeepObject = (nestedObjectArray, keyOne) => {
    return nestedObjectArray.map(element => {
        return element[keyOne];
    });
};
exports.normalizeOneLevelDeepObject = normalizeOneLevelDeepObject;
