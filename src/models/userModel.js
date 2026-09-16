import mongoose, { Schema,model} from 'mongoose'
const userSchema = new Schema(
    {
        first_name:{
            required:true,
            type:String,
            trim:true
        },
        last_name:{
            required:true,
            type:String,
            trim:true
        },
        email: {
            required:true,
            type:String,
            trim:true,
            unique:true,
            lowercase:true,
        },
        password: {
            required:true,
            type:String,
        },
        role:{
            type:String,
            enum:["admin","user","organizer"],
            default:"user"
        },
        provider:{
            type:String,
            enum:["local","github"],
            default:"local"
        },
        providerId: {
            type:String,
            default:null
        }
    },
    {
        timestamps:true
    }
)
export const userModel = mongoose.model("user",userSchema)