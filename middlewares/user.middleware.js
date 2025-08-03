import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Error! no token provided"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized! invalid token"});
        }

        const user=await userModel.findById(decoded.userId).select("-password");

        if(!user) return res.status(404).json({message:"user not found!"});

        next();
    } catch (error) {
        console.log("error in protected route as: ",error.message);
        return res.status(500).json({message:"internal server error"});
    }
};