import { Schema } from "mongoose";
import { Url } from "../interfaces/url";



export const urlSchema = new Schema<Url>({
    id: {
        type: 'String',
        required: true
    },
    originUrl: {
        type: 'String',
        required: true
    },
    shortUrl: {
        type: 'String',
        required: true
    },
    click: {
        type:"Number",
        required: true
    },
    date: {
        type: 'String',
        default: Date.now.toString,
    }
})