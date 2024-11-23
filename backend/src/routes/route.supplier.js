import {getSuppliers,addSuppliers,updateSuppliers,deleteSuppliers} from '../controllers/supplier.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/suppliers',authenticateToken, getSuppliers);
router.post('/add/supplier',authenticateToken, addSuppliers);
router.put('/update/supplier/:id',authenticateToken, updateSuppliers);
router.delete('/delete/supplier/:id',authenticateToken, deleteSuppliers);

export default router;