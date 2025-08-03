import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/Database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app=express();

configDotenv();
app.use(bodyParser.json({limit:"50mb"}));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import userquizRouter from "./routes/userquiz.route.js";

app.use("/api/user",userRouter);
app.use("/api/quiz",userquizRouter);

try{
    const isConnected=await connectDB();
    if(isConnected){
        app.listen(3000,()=>{
            console.log("listening on port 3000");
        })
    }
} catch(error){ 
    console.log("error in connecting to database: ",error);
}