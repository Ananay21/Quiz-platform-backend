import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/Database.js";

const app=express();
configDotenv();

try{
    const isConnected=await connectDB();
    if(isConnected){
        app.listen(3000,()=>{
            console.log("listening on port 3000");
        })
    }
} catch(error){ 
    console.log("error: ",error);
}