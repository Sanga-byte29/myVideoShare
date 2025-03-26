import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/userSchema';

dotenv.config();
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string,
};

passport.use(new JWTStrategy(opts, async(jwtPayload, done) => {
    try {
         const user = await User.findById(jwtPayload._id).select("-password");
         if (!user){
            return done(null, false);
         }
         return done(null, false);
    } catch (error) {
        console.error(`Error in jwt authentication: ${error}`);
        return done(error);
    }
}))

export default passport;