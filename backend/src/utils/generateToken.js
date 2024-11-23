import jwt from 'jsonwebtoken';

export const secret = 'MiloPrietoMatias';

export const generateToken = (playload)=>{
    return jwt.sign(playload, secret, {expiresIn: '1h'});
}

export const verifyToken= (token)=>{
    return jwt.verify(token,secret);
}