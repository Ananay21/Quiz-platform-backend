import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        EmailId:{
            type:String,
            required:true,
            unique:true
        },
        UserName:{
            type:String,
            required:true,
            unique:true
        },
        Password:{
            type:String,
            required:true,
            unique:true
        }
    },
    {
        timestamps:true
    }
);


const userModel=mongoose.model("User",userSchema);


export default userModel;