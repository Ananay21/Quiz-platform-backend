import { Router } from "express";
import { signUp,login, logOut } from "../controllers/user.controller.js";

const userRouter=Router();

userRouter.get("/",(req,res)=>res.send("hello world!"));
userRouter.post("/createUser",signUp);
userRouter.post("/login",login);
userRouter.post("/logout",logOut);

export default userRouter;