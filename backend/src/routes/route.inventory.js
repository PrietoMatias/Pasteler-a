import {getInventories, addInventory,updateInventory,deleteInventory} from '../controllers/inventory.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/inventory',authenticateToken, getInventories);
router.post('/add/inventory',authenticateToken, addInventory);
router.put('/update/inventory/:id',authenticateToken, updateInventory);
router.delete('/delete/inventory/:id',authenticateToken, deleteInventory);


export default router;