"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../lib/jwt");
function tokenValidator() {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: 'Missing authorization header' });
            return;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer') {
            res.status(401).json({ message: 'Missing authorization header' });
            return;
        }
        try {
            const tokenPayload = (0, jwt_1.verifyToken)(token);
            req.user = tokenPayload;
        }
        catch (_a) {
            res.status(401).json({ message: 'Missing authorization header' });
            return;
        }
        return next();
    };
}
exports.default = tokenValidator;
