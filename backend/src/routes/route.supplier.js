import {getSuppliers,addSuppliers,updateSuppliers,deleteSuppliers} from '../controllers/supplier.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/suppliers', getSuppliers);
router.post('/add/supplier', addSuppliers);
router.put('/update/supplier/:id', updateSuppliers);
router.delete('/delete/supplier/:id', deleteSuppliers);

export default router;