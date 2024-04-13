"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToJSONMethod = void 0;
const generateToJSONMethod = (schema) => {
    schema.methods.toJSON = function () {
        var _a;
        const obj = (_a = this === null || this === void 0 ? void 0 : this.toObject) === null || _a === void 0 ? void 0 : _a.call(this);
        if (obj) {
            delete obj.password;
            delete obj._id;
        }
        return obj;
    };
};
exports.generateToJSONMethod = generateToJSONMethod;
