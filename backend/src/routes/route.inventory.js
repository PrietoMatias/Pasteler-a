import {getInventories, addInventory,updateInventory,deleteInventory} from '../controllers/inventory.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/inventory', getInventories);
router.post('/add/inventory', addInventory);
router.put('/update/inventory/:id', updateInventory);
router.delete('/delete/inventory/:id', deleteInventory);


export default router;