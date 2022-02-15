"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ficha_1 = require("../controllers/ficha");
const router = (0, express_1.Router)();
router.post('/save', ficha_1.save);
//# sourceMappingURL=ficha.js.map