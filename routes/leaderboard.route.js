import { getTopUsers } from "../controllers/leaderboard.controller.js";
import {Router} from "express";
import { protectRoute } from "../middlewares/user.middleware.js";

const leaderboardRouter=Router();

leaderboardRouter.use(protectRoute);

leaderboardRouter.get("/users",getTopUsers);

export default leaderboardRouter;