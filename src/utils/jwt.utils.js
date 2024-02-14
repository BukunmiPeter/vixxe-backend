"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const secretKey = config_1.default.get("secretKey");
const privateKey = config_1.default.get("privateKey");
const publicKey = config_1.default.get("publicKey");
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, secretKey, Object.assign({}, (options && options)));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    if (!token) {
        console.error('Token is undefined or null');
        return {
            valid: false,
            expired: false,
            decoded: null,
        };
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
