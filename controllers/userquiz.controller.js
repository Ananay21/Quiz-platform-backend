import userquizModel from "../models/userquiz.model.js";

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