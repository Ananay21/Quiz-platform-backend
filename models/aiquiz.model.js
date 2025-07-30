import mongoose from "mongoose";

const aiQuizSchema=new mongoose.Schema(
    {
        CentralTopic:{
            type:String,
            required:true
        },
        SubTopics:{
            type:[String],
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

const aiQuizModel=mongoose.model("AiQuizModel",aiQuizSchema);
export default aiQuizModel;