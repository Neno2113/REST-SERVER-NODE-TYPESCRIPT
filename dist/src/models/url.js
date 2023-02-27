"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSchema = void 0;
const mongoose_1 = require("mongoose");
exports.urlSchema = new mongoose_1.Schema({
    id: {
        type: 'String',
        required: true
    },
    originUrl: {
        type: 'String',
        required: true
    },
    shortUrl: {
        type: 'String',
        required: true
    },
    click: {
        type: "Number",
        required: true
    },
    date: {
        type: 'String',
        default: Date.now.toString,
    }
});
//# sourceMappingURL=url.js.map