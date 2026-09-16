import mongoose, { Schema,model } from "mongoose";
const sessionSchema = new Schema({
    eventId: {
        type:Schema.Types.ObjectId,
        ref:"event",
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})
export const sessionModel = mongoose.model("session",sessionSchema)