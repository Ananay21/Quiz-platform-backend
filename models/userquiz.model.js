import mongoose from "mongoose";

const questionSchema=new mongoose.Schema(
    {
        Question:{
            type:String,
            required:true
        },
        Options:{
            type:[String],
            required:true
        },
        Answer:{
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
        Level:{
            type:Number
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