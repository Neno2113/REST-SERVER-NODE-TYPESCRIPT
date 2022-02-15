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
exports.getLikesCount = exports.removeLike = exports.addLike = void 0;
const Fichas_1 = __importDefault(require("../models/Fichas"));
const Likes_1 = __importDefault(require("../models/Likes"));
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ficha } = req.body;
    const { body } = req;
    const { uid } = req;
    try {
        let like = yield Likes_1.default.findOne({ ficha, user: uid });
        if (like) {
            return res.status(404).json({
                ok: false,
                msg: 'Este registro ya existe'
            });
        }
        const newLike = new Likes_1.default(body);
        newLike.user = uid;
        yield newLike.save();
        //update ficha likes count +1
        const fichaUpdate = yield Fichas_1.default.findById(ficha);
        fichaUpdate.likes = +1;
        yield fichaUpdate.save();
        return res.json({
            ok: true,
            like: newLike
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
exports.addLike = addLike;
const removeLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ficha } = req.params;
    try {
        let like = yield Likes_1.default.findOne({ ficha });
        if (!like) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro ningun registro'
            });
        }
        const likeRemoved = yield Likes_1.default.findOneAndDelete({ ficha });
        return res.json({
            ok: true,
            like: likeRemoved
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
exports.removeLike = removeLike;
const getLikesCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { limite = 5, desde = 0 } = req.query;
    // const [ total, likes ] = await Promise.all([
    //     Likes.countDocuments( ),
    //     Likes.find()
    //         .populate('ficha')
    //         .populate('user', 'name surname')
    //         .skip( Number( desde ))
    //         .limit( Number( limite ))
    // ]);
    const likes = yield Likes_1.default.aggregate([
        { "$group": { _id: "$ficha", count: { $sum: 1 } } }
    ]);
    // let result =  likes.exec()
    return res.json({
        ok: true,
        // total,
        likes,
        // result
    });
});
exports.getLikesCount = getLikesCount;
//# sourceMappingURL=likes.js.map