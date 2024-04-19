"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    next();
}
exports.isAuthenticated = isAuthenticated;
function isAdmin(req, res, next) {
    next();
}
exports.isAdmin = isAdmin;
