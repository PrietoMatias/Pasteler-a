import {register, Login, updateUser, deleteUser} from '../controllers/user.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', Login);
router.put('/update/user/:id',authenticateToken, updateUser);
router.delete('/delete/user/:id',authenticateToken, deleteUser);


export default router;