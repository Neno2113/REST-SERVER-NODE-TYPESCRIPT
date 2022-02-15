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
exports.renewToken = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists'
            });
        }
        const newUser = new User_1.default(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        yield newUser.save();
        // Generar JWT para el Login after register
        const token = yield (0, jwt_1.default)(user.id, user.name, user.avatar);
        return res.status(201).json({
            ok: true,
            uid: newUser._id,
            name: newUser.name + newUser.surname,
            avatar: newUser.avatar,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or password incorrect'
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or password incorrect'
            });
        }
        // Generar JWT para el Login after register
        const token = yield (0, jwt_1.default)(user.id, user.name, user.avatar);
        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name, avatar } = req;
    const token = yield (0, jwt_1.default)(uid, name, avatar);
    return res.json({
        ok: true,
        uid,
        name,
        avatar,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map