import { IUser } from "../../models/userSchema";
import jwt  from 'jsonwebtoken';


export const generateJwtToken = async(user: IUser) => {
    const secretOrKey = process.env.JWT_SECRET_KEY;
    if (!secretOrKey) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    return jwt.sign(user.toJSON(), secretOrKey, {
        expiresIn: "1000d",
    });
}