"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ficha_1 = require("../controllers/ficha");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.use(validar_jwt_1.default);
router.post('/save', [
    (0, express_validator_1.check)('title', 'The title is required').not().isEmpty(),
    (0, express_validator_1.check)('author', 'The author is required').not().isEmpty(),
    (0, express_validator_1.check)('description', 'The description is required').not().isEmpty(),
    (0, express_validator_1.check)('fecha_pub', 'The date is required').not().isEmpty(),
    validar_campos_1.default
], ficha_1.save);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'The id is not valid').isMongoId(),
    (0, express_validator_1.check)('title', 'The title is required').not().isEmpty(),
    (0, express_validator_1.check)('author', 'The author is required').not().isEmpty(),
    (0, express_validator_1.check)('description', 'The description is required').not().isEmpty(),
    (0, express_validator_1.check)('fecha_pub', 'The date is required').not().isEmpty(),
    validar_campos_1.default
], ficha_1.updateFile);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'The id is not valid').isMongoId(),
    validar_campos_1.default
], ficha_1.deleteFile);
router.get('/', ficha_1.getFiles);
exports.default = router;
//# sourceMappingURL=fichaRoutes.js.map