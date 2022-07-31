"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function verifyToken(antigoToken) {
    if (!antigoToken) {
        return false;
    }
    const token = (0, jsonwebtoken_1.verify)(antigoToken, config_1.auth.secret, function (err) {
        if (err) {
            return false;
        }
        return true;
    });
    return token;
}
exports.verifyToken = verifyToken;
