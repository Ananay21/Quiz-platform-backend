import mongoose, { model } from "mongoose";

const leaderBoardSchema=new mongoose.Schema(
    {
        Points:{
            type:Number,
            required:true
        },
        UserId:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    },{
        timestamps:true
    }
);

export default model("LeaderBoard",leaderBoardSchema);