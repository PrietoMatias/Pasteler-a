import {Router} from 'express';
import {topSuppliers} from '../controllers/supplier.controller.js';
import { avgProduct,avgMargin,lowStockProducts,categoryDistribution} from '../controllers/product.controller.js';
import {monthlySales,weeklySales,mostSalesProducts,salesTrends,paymentMethods} from '../controllers/sales.controller.js';
import authenticateToken from '../middelwares/autenticateToken.js';
const router = Router(); 

router.get('/dashboard/monthlysales',authenticateToken, monthlySales);
router.get('/dashboard/weeklysales',authenticateToken, weeklySales);
router.get('/dashboard/toproducts',authenticateToken, mostSalesProducts);
router.get('/dashboard/salestrends',authenticateToken, salesTrends);
router.get('/dashboard/paymentmethods',authenticateToken, paymentMethods);
router.get('/dashboard/avgproduct',authenticateToken, avgProduct);
router.get('/dashboard/avgmargin',authenticateToken, avgMargin);
router.get('/dashboard/lowproduct',authenticateToken, lowStockProducts);
router.get('/dashboard/categorydistribution',authenticateToken, categoryDistribution);
router.get('/dashboard/topsuppliers',authenticateToken, topSuppliers);

export default router;