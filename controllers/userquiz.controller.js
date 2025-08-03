import userquizModel from "../models/userquiz.model.js";
import {GoogleGenAI} from "@google/genai";

export const getQuizs=async (req,res)=>{
    try {
        const getQuiz=await userquizModel.find();

        if(!getQuiz.length){
            return res.status(404).json({message:"data not found!",success:false});
        }

        return res.status(200).json({message:"data found!",success:true,data:getQuiz});

    } catch (error) {
        console.log("error getting all quiz as :",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    
    }
};

export const getQuizById=async (req,res)=>{
    const id=req.params.id;

    try {
        const getSingleQuiz=await userquizModel.findById(id);

        if(!getSingleQuiz){
            return res.status(404).json({message:`data of id ${id} not found!`,success:false});
        }

        return res.status(200).json({message:"data found!",success:true,data:getSingleQuiz});
    } catch (error) {
        console.log("error getting quiz by id as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const getQuizByUserId=async (req,res)=>{
    const id=req.params.id;

    try {
        if(!id){
            return res.status(400).json({message:"id not provided!",success:false});
        }

        const getAllQuiz=await userquizModel.findOne({CreatorId:id});

        if(!getAllQuiz){
            return res.status(404).json({message:"quiz of user not found!",success:false});
        }

        return res.status(200).json({mesage:"quiz found",success:true,data:getAllQuiz});
    } catch (error) {
        console.log("error in getting quiz by user id as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const createQuiz=async (req,res)=>{
    const {centralTopic,subTopics,questions,creatorId,description}=req.body;

    try {
        if(!centralTopic||!subTopics||!creatorId||!description||!questions) {
            return res.status(400).json({message:"data not provided",success:false});
        }

        const insertedUser=await userquizModel.insertOne(
            {
                CentralTopic:centralTopic,
                SubTopics:subTopics,
                Questions:questions,
                CreatorId:creatorId,
                Description:description
            }
        );

        if(!insertedUser){
            return res.status(400).json({message:"could not insert user!",success:false});
        }

        return res.status(201).json({message:"quiz created",success:true,data:insertedUser});

    } catch (error) {
        console.log("error creating quiz as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const updateQuiz= async (req,res)=>{
    const {centralTopic,subTopics,questions,description}=req.body;
    const id=req.params.id;

    try {

        if(!id){
            return res.status(400).json({message:"id not provided",success:false});
        }

        const findUser=await userquizModel.findById(id);

        if(!findUser){
            return res.status(404).json({message:"quiz of provided id not found!",success:false});
        }

        const updatedUser=await userquizModel.updateOne(
            {
                _id:id
            },
            {
                CentralTopic:(centralTopic.length==0)?findUser.CentralTopic:centralTopic,
                SubTopics:(subTopics.length==0)?findUser.SubTopics:subTopics,
                Questions:(questions.length==0)?findUser.Questions:questions,
                Description:(description.length==0)?findUser.Description:description,
            }
        )

        if(!updatedUser){
            return res.status(400).json({message:"could not update user!",success:false});
        }

        return res.status(201).json({message:"quiz updated!",success:true,data:updatedUser});

    } catch (error) {
        console.log("error updating quiz as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const generateQuiz=async (req,res)=>{
    const APIKEY=process.env.GEMINI_API_KEY;
    const ai=new GoogleGenAI({apiKey:APIKEY});
    const {centralTopic,subTopics,userId}=req.body;

    try {

        if(!centralTopic||!subTopics||!userId){
            return res.status(400).json({message:"data not provided",success:false});
        }
        
        const aiResponse=await ai.models.generateContent(
            {
                model:'gemini-2.0-flash-001',
                contents:`Generate a quiz as {[{"Question":"String","Options":["String"],"Answer":"String"}]}. There should be 5 questions in it. It should revolve around the central topic of ${centralTopic} and subtopics as ${subTopics}. Don't add any extra messages. Add an underscore,and then  add a description for this quiz. Thank you`
            }
        );

        if(!aiResponse){
            return res.status(500).json({message:"error in generating quiz",success:false});
        }

        const quizObj=JSON.parse(aiResponse.text.split('_')[0].slice(7));

        const insertObj= await userquizModel.insertOne(
            {
                CentralTopic:centralTopic,
                SubTopics:subTopics,
                CreatorId:userId,
                Description:aiResponse.text.split('_')[1],
                Questions:quizObj
            }
        );

        if(!insertObj){
            return res.status(500).json({message:"error inserting data!",success:false});
        }

        return res.status(200).json({message:"quiz created",success:true,data:insertObj});
    } catch (error) {
        console.log("error in generating quiz as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const deleteQuiz=async (req,res)=>{
    const id=req.params.id;

    try {

        if(!id){
            return res.status(400).json({message:"id not provided!",success:false});
        }

        const deletedQuiz=await userquizModel.deleteOne({_id:id});

        if(deletedQuiz.deletedCount==0){
            return res.status(404).json({message:"quiz of id not found!",success:false});
        }

        return res.status(200).json({message:"quiz deleted",success:true});

    } catch (error) {
        console.log("error deleting quiz as: ",error.message);
        return res.status(500).json({message:"internal server error",success:false});
    }
};