"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const likes_1 = require("../controllers/likes");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.use(validar_jwt_1.default);
router.post('/add', [
    (0, express_validator_1.check)('ficha', 'Is not a valid id').isMongoId(),
    validar_campos_1.default
], likes_1.addLike);
router.post('/remove/:ficha', [
    (0, express_validator_1.check)('ficha', 'Is not a valid id').isMongoId(),
    validar_campos_1.default
], likes_1.removeLike);
router.get('/', likes_1.getLikesCount);
exports.default = router;
//# sourceMappingURL=likesRoutes.js.map