import { getTopUsers,addUser } from "../controllers/leaderboard.controller.js";
import {Router} from "express";
import { protectRoute } from "../middlewares/user.middleware.js";

const leaderboardRouter=Router();

leaderboardRouter.use(protectRoute);

leaderboardRouter.get("/users",getTopUsers);

leaderboardRouter.post("/score",addUser);

export default leaderboardRouter;