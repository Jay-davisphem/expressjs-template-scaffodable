"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["PRIVILEDGED_AUTH_USER"] = "INSTRUCTOR";
    RoleEnum["AUTH_USER"] = "STUDENT";
    RoleEnum["MODERATOR"] = "MODERATOR";
    RoleEnum["GUEST"] = "GUEST";
})(RoleEnum || (RoleEnum = {}));
exports.default = RoleEnum;
