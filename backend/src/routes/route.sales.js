import {getSales,addSales,updateSale,deleteSale} from '../controllers/sales.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/sales',authenticateToken, getSales);
router.post('/add/sales',authenticateToken, addSales);
router.put('/update/sale/:id',authenticateToken, updateSale);
router.delete('/delete/sale/:id',authenticateToken, deleteSale);

export default router;