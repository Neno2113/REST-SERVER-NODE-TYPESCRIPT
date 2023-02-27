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
exports.ConnectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
class ConnectionDB {
    constructor() {
        this.dbUrl = process.env.DBURL || "mongodb://localhost:27017/short-link";
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield mongoose_1.default.connect(this.dbUrl);
                console.log("Database Connected");
                return connection;
            }
            catch (error) {
                console.log(error);
                throw new Error('An error ocurred tryng to connect to the database.');
            }
        });
    }
}
exports.ConnectionDB = ConnectionDB;
//# sourceMappingURL=connection.js.map