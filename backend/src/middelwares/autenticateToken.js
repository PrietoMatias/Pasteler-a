import jwt from 'jsonwebtoken';
import { secret } from '../utils/generateToken.js';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try { 
    const user = jwt.verify(token, secret); 
    res.locals.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export default authenticateToken;
