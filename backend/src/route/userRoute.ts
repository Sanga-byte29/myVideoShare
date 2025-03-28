import express from "express";
import { getUserDetails, updateUser } from "../controller/user/userController";
import passport from "passport";
const router = express.Router();


router.get('/profile', passport.authenticate("jwt", { session: false }), getUserDetails);
router.post("/update", updateUser);

export default router;