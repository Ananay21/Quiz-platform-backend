import { Router } from "express";
import { signUp,login, logOut, getAllUsers, getUserById } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/user.middleware.js";

const userRouter=Router();

userRouter.get("/",(req,res)=>res.send("hello world!"));
userRouter.post("/createUser",signUp);
userRouter.post("/login",login);
userRouter.get("/allUsers",protectRoute,getAllUsers);
userRouter.get("/:id",protectRoute,getUserById);
userRouter.post("/logout",protectRoute,logOut);

export default userRouter;