import { Router } from "express";
import { getQuizById,getQuizs,createQuiz,updateQuiz,deleteQuiz } from "../controllers/userquiz.controller.js";

const userquizRouter=Router();

userquizRouter.get("/allQuiz",getQuizs);

userquizRouter.get("/:id",getQuizById);

userquizRouter.post("/create",createQuiz);

userquizRouter.put("/update/:id",updateQuiz);

userquizRouter.delete("/delete/:id",deleteQuiz);

export default userquizRouter;