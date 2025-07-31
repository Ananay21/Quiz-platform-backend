import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/Database.js";
import { signUp,login, logOut } from "./controllers/user.controller.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app=express();
configDotenv();
app.use(bodyParser.json({limit:"50mb"}));
app.use(cookieParser());

app.get("/",(req,res)=>res.send("hello world!"));
app.post("/createUser",signUp);
app.post("/login",login);
app.get("/logout",logOut);
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