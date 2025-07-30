import mongoose from "mongoose";

const userQuizSchema=new mongoose.Schema(
    {
        CentralTopic:{
            type:String,
            required:true
        },
        SubTopics:{
            type:[String],
            required:true
        },
        CreatorId:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        },
        Description:{
            type:String
        }
    },
    {
        timestamps:true
    }
);

const userQuizModel=mongoose.model("UserQuiz",userQuizSchema);

export default userQuizModel;