"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)('name', 'The Name is requuired').not().isEmpty(),
    (0, express_validator_1.check)('surname', 'The Surname is requuired').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password', 'The password is requuired').isLength({ min: 6 }),
    validar_campos_1.default
], auth_1.register);
router.post('/login', [
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password', 'The password is requuired').not().isEmpty(),
    validar_campos_1.default
], auth_1.login);
router.get('/renew', validar_jwt_1.default, auth_1.renewToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map