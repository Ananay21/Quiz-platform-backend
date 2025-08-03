import { Router } from "express";
import { getQuizById,getQuizs,createQuiz,updateQuiz,deleteQuiz, generateQuiz } from "../controllers/userquiz.controller.js";
import { protectRoute } from "../middlewares/user.middleware.js";

const userquizRouter=Router();

userquizRouter.use(protectRoute);

userquizRouter.get("/allQuiz",getQuizs);

userquizRouter.get("/:id",getQuizById);

userquizRouter.post("/create",createQuiz);

userquizRouter.post("/generate",generateQuiz);

userquizRouter.put("/update/:id",updateQuiz);

userquizRouter.delete("/delete/:id",deleteQuiz);

export default userquizRouter;