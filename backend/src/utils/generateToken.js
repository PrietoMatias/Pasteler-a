import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const secret = process.env.JWT_SECRET;

export const generateToken = (playload)=>{
    return jwt.sign(playload, secret, {expiresIn: '1h'});
}

export const verifyToken= (token)=>{
    return jwt.verify(token,secret);
}