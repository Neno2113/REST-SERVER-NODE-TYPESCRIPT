"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../database/connection");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.db = new connection_1.ConnectionDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //body parsing
        this.app.use(express_1.default.json());
    }
    routes() {
    }
    listen() {
        this.app.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            console.log('Servidor corriendo en puerto ', this.port);
            yield this.db.connectDB();
        }));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map