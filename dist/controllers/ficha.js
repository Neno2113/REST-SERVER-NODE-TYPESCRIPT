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
exports.deleteFile = exports.updateFile = exports.getFiles = exports.save = void 0;
const Fichas_1 = __importDefault(require("../models/Fichas"));
const Likes_1 = __importDefault(require("../models/Likes"));
const save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { uid } = req;
    try {
        let fileCreated = yield Fichas_1.default.findOne({ title });
        if (fileCreated) {
            return res.status(400).json({
                ok: false,
                msg: 'File already exists!!'
            });
        }
        // console.log(req.body);
        const fileNew = new Fichas_1.default(req.body);
        fileNew.user = uid;
        yield fileNew.save();
        return res.status(201).json({
            ok: true,
            ficha: fileNew,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        });
    }
});
exports.save = save;
const getFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const [total, files] = yield Promise.all([
        Fichas_1.default.countDocuments(),
        Fichas_1.default.find()
            .populate('user', 'name surname')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    return res.json({
        ok: true,
        total,
        files
    });
});
exports.getFiles = getFiles;
const updateFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        let file = yield Fichas_1.default.findById(id);
        if (!file) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una ficha con este id ${id}`
            });
        }
        const fileUpdated = yield Fichas_1.default.findByIdAndUpdate(id, body, { returnOriginal: false });
        return res.json({
            ok: true,
            file: fileUpdated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        });
    }
});
exports.updateFile = updateFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let file = yield Fichas_1.default.findById(id);
        if (!file) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una ficha con este id ' + id
            });
        }
        const [like, ficha] = yield Promise.all([
            Likes_1.default.findOneAndDelete({ ficha: id }),
            Fichas_1.default.findByIdAndDelete(id)
        ]);
        return res.json({
            ok: true,
            file: ficha,
            like
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        });
    }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=ficha.js.map