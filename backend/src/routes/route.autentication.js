import express from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = express.Router();

router.get('/check-auth', authenticateToken, (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ message: 'Autenticado' });
});

export default router;
