"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT Secret not found on env variables');
}
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ sub: user.id, email: user.email }, secret, { expiresIn: '30d' });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    const verify = jsonwebtoken_1.default.verify(token, secret);
    return verify;
}
exports.verifyToken = verifyToken;
