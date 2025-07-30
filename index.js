import express from "express";
import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
const genAPIkey=process.env.GEMINI_API_KEY;

const app=express();
configDotenv();
const ai=new GoogleGenAI({apiKey:genAPIkey});

app.get("/",(req,res)=>{
    res.send("Hellow!");
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})