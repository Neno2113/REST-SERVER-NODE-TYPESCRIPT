import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }

})


userSchema.method('toJSON', function () {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

export default model('User', userSchema );