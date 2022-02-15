import { Schema, model } from "mongoose";


const likeSchema = new Schema({
    ficha: {
        type: Schema.Types.ObjectId,
        ref: 'Ficha',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  
})


likeSchema.method('toJSON', function () {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

export default model('Like', likeSchema );