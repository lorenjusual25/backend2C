import mongoose, { Schema,model } from "mongoose";
const eventSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    location: {
        type:String,
        required:true
    }
})
export const eventModel = mongoose.model("event",eventSchema)