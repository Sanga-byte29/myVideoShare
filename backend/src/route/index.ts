import express from "express";
const router = express.Router();
import authRoute from "./authRoute";
import passport from "passport";
import userRoute from "./userRoute";


router.use('/auth', authRoute);
router.use('/user', passport.authenticate("jwt", {session: false}),userRoute);

export default router;