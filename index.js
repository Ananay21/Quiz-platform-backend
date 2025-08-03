import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./lib/Database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

configDotenv();
app.use(bodyParser.json(
    {
        limit:"50mb"
    }
));
app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

import userRouter from "./routes/user.route.js";
import userquizRouter from "./routes/userquiz.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js";

app.use("/api/user",userRouter);
app.use("/api/quiz",userquizRouter);
app.use("/api/leaderboard",leaderboardRouter);

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