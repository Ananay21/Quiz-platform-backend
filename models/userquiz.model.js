import mongoose from "mongoose";

const questionSchema=new mongoose.Schema(
    {
        question:{
            type:String,
            required:true
        },
        options:{
            type:[String],
            required:true
        },
        answer:{
            type:String,
            required:true,
        }
    }
);

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
        Questions:{
            type:[questionSchema],
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