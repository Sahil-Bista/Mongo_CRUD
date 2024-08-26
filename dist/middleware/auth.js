"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var middleware = function (req, res, next) {
    var authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization) {
        return res.status(401).send("Token not found");
    }
    var token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer") {
        return res.status(401).send("Bearer token not present");
    }
    var decoded_token = token[1];
    var secret_key = "BigBigSecret";
    try {
        var data = jsonwebtoken_1.default.verify(decoded_token, secret_key);
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(401).send("Invalid token");
    }
};
exports.middleware = middleware;
// export {middleware};
//# sourceMappingURL=auth.js.map