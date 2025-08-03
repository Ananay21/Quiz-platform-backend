import leaderboardModel from "../models/leaderboard.model.js";

export const getTopUsers=async (req,res)=>{
    try {
        const getTop=await leaderboardModel.find().sort({Points:"desc"}).limit(10);

        if (!getTop) return res.status(404).json({message:"could not find sortedd users",succcess:false});

        return res.status(200).json({message:"data found!",success:true,data:getTop});

    } catch (error) {
        console.log("error in getting top users as :",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};