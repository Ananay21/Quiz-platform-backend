import userModel from "../models/user.model.js";
import { encryptPassword,comparePassword } from "../utils/password.js";
import { verifyJWT } from "../utils/cookieJWT.js";

export const signUp=async (req,res)=>{
    const {emailId,userName,password}=req.body;

    try {
        if(!emailId||!userName||!password){
            return res.status(400).json({message:"Parameters not provided",success:false});
        }

        if(password.length<6){
            return res.status(404).json({message:"Password must be greater than 6",success:false});
        }

        const check=await userModel.findOne({$or:[{UserName:userName},{EmailId:emailId}]});

        if(check){
            return res.status(400).json({message:"User already exists! Try logging in",success:false});
        }

        const encryptedPassword= await encryptPassword(password);

        if(encryptedPassword==""){
            return res.status(500).json({message:"Error while Creating account!",success:false});
        }

        const createdUser=await userModel.create({UserName:userName,EmailId:emailId,Password:encryptedPassword});

        if(!createdUser){
            return res.status(500).json({message:"Internal server error!",success:false});
        }

        await verifyJWT(createdUser._id,res);
        return res.status(201).json({message:"User created!",data:{emailId,userName},success:true});
    } catch (error) {
        console.log("error during signup: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const login=async (req,res)=>{
    const {emailId,password}=req.body;

    try {
        if(!emailId||!password){
            return res.status(400).json({message:"Parameters not provided",success:false});
        }

        const user=await userModel.findOne({EmailId:emailId});

        if(!user){
            return res.status(404).json({message:"User does not exist! Try signing up",success:false});
        }

        const check= await comparePassword(password,user.Password)

        if(!check){
            return res.status(401).json({message:"Incorrect Password!",success:false});
        }

        await verifyJWT(user._id,res);
        return res.status(200).json({message:"User logged in successfully!",success:true,data:{userName:user.UserName,emailId:emailId}});
    } catch (error) {
        console.log("error during login :",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const logOut=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"logged out successfully",success:true});
    } catch (error) {
        console.log("error during logout: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
}

export const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await userModel.find();

        if(!allUsers){
            return res.status(404).json({message:"no user found!"});
        }

        return res.status(200).json({message:"users found!",success:true,data:allUsers});
    } catch (error) {
        console.log("error getting all users as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const getUserById=async (req,res)=>{
    const id=req.params.id;

    try {
        if (!id) return res.status(401).json({message:"parameters not provided!",success:false});

        const userById=await userModel.findById(id);

        if(!userById){
            return res.status(404).json({message:"user of id not found!",success:false});
        }

        return res.status(200).json({message:"user found!",success:true,data:userById});
    } catch (error) {
        
    }
};