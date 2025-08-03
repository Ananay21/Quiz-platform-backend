import leaderboardModel from "../models/leaderboard.model.js";

export const getTopUsers=async (req,res)=>{
    try {
        const getTop=await leaderboardModel.find().sort({Points:"desc"}).limit(10);

        if (!getTop) return res.status(404).json({message:"could not find sorted users",success:false});

        return res.status(200).json({message:"data found!",success:true,data:getTop});

    } catch (error) {
        console.log("error in getting top users as :",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const addUser=async (req,res)=>{
    const {points,userId,userName}=req.body;

    try {
        if(!points||!userId||!userName) return res.status(400).json({message:"parameters not provided",success:false});    
        
        const findPrevious=await leaderboardModel.find({UserId:userId});

        if(findPrevious.length===0){
            // score does not exist previously, so update the user
            const insertScore=await leaderboardModel.insertOne({UserId:userId,Points:points,UserName:userName});

            if(!insertScore){
                return res.status(500).json({message:"error inserting score in leaderboard",success:false});
            }
            return res.status(201).json({message:"user score created!",success:true,data:insertScore});
        }
        else{
            // update the score to the new score
            const updateScore=await leaderboardModel.updateOne({_id:findPrevious[0]._id},{...findPrevious,Points:points});

            if(!updateScore){
                return res.status(500).json({message:"error updating score in leaderboard",success:false});
            }
            return res.status(200).json({message:"user score updated!",success:true,data:updateScore});
        }
    } catch (error) {
        console.log("error adding score to the leaderboard as : ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
}