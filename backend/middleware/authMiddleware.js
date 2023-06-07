import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

export const protect = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }
        catch(e){
            console.log(e);
            res.status(401);
            throw new Error('Not authorised, token failed');
        }
    }
    else
    {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
})

// Admin middleware
export const admin = asyncHandler((req,res,next)=>{
    if(req.user && req.user.isAdmin) {
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorised as admin');
    }
})
