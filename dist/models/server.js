"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fichaRoutes_1 = __importDefault(require("../routes/fichaRoutes"));
const likesRoutes_1 = __importDefault(require("../routes/likesRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            fichas: '/api/file',
            likes: '/api/like',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //body parsing
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.auth, authRoutes_1.default);
        this.app.use(this.apiPaths.fichas, fichaRoutes_1.default);
        this.app.use(this.apiPaths.likes, likesRoutes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map