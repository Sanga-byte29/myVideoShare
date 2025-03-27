import { Request, RequestHandler } from "express";
import User from "../../models/userSchema";
import crypto from "crypto";
import { sendResponse } from "../../config/utils/sendRepsonse";
import { compareHashedPassword, hashPassword } from "../../config/utils/passwordHelper";
import { generateJwtToken } from "../../config/utils/generateJwtToken";

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
        const hashedPassword = await hashPassword(req.body.password);
        const newUser = await User.create({email, password:hashedPassword , token: crypto.randomBytes(16).toString('hex'),});
        //send response of success
        return sendResponse(res, 200, true, "User created successfully", {user: newUser});
    } catch (error) {
        console.error(`Error in signing up user: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
}

export const signInUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 400, false, "User does not exist");
        }

        // 2. Check if password is correct
        const matchPassword = await compareHashedPassword(password, user.password);
        if (!matchPassword) {
            console.log("Password comparison failed!");
            return sendResponse(res, 400, false, "Invalid password");
        }

        // 3. Generate JWT token
        const jwtToken = await generateJwtToken(user);

        // 4. Return response
        return sendResponse(res, 200, true, "Logged in successfully", {user: {token: jwtToken}});

    } catch (error) {
        console.error(`Error in signing in user: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
};

