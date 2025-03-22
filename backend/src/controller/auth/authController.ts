import { Request, RequestHandler } from "express";
import User from "../../models/userSchema";
import crypto from "crypto";
import { sendResponse } from "../../config/utils/sendRepsonse";
import { hashPassword } from "../../config/utils/passwordHelper";

interface RegisterReq extends Request{
    body: {
        email: string;
        password: string;
        
    }
}

export const signUpUser: RequestHandler = async (req: RegisterReq, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return sendResponse(res, 400, false, "user already exists");

        }
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({email, password:hashPassword , token: crypto.randomBytes(16).toString('hex'),});
        //send response of success
        return sendResponse(res, 200, true, "User created successfully", {user: newUser});
    } catch (error) {
        console.error(`Error in signing up user: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
}
