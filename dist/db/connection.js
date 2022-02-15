"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    try {
        mongoose_1.default.connect(process.env.DB_CNN);
        console.log("Conexion exitosa");
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
};
exports.default = dbConnection;
//# sourceMappingURL=connection.js.map