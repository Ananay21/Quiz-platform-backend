import { Router } from "express";
import { getQuizById,getQuizs,createQuiz,updateQuiz,deleteQuiz, generateQuiz, getQuizByUserId } from "../controllers/userquiz.controller.js";
import { protectRoute } from "../middlewares/user.middleware.js";

const userquizRouter=Router();

userquizRouter.use(protectRoute);

userquizRouter.get("/allQuiz",getQuizs);

userquizRouter.get("/:id",getQuizById);

userquizRouter.get("/allQuiz/:id",getQuizByUserId);

userquizRouter.post("/create",createQuiz);

userquizRouter.post("/generate",generateQuiz);

userquizRouter.put("/update/:id",updateQuiz);

userquizRouter.delete("/delete/:id",deleteQuiz);

export default userquizRouter;