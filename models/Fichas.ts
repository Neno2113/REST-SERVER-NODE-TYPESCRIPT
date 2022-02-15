import { Schema, model } from "mongoose";


const fichaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    fecha_pub: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


fichaSchema.method('toJSON', function () {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

export default model('Ficha', fichaSchema );