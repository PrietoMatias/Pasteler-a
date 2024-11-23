import {getProducts, updateProduct, addProduct, deleteProduct, getProduct} from '../controllers/product.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/products', getProducts);
router.get('/get/product/:id', getProduct)
router.post('/add/products',authenticateToken, addProduct);
router.put('/update/product/:id',authenticateToken, updateProduct);
router.delete('/delete/product/:id',authenticateToken, deleteProduct);


export default router;
