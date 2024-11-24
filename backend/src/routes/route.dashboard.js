import {Router} from 'express';
import {topSuppliers} from '../controllers/supplier.controller.js';
import { avgProduct,avgMargin,lowStockProducts,categoryDistribution} from '../controllers/product.controller.js';
import {monthlySales,weeklySales,mostSalesProducts,salesTrends,paymentMethods} from '../controllers/sales.controller.js';

const router = Router(); 

router.get('/dashboard/monthlysales', monthlySales);
router.get('/dashboard/weeklysales', weeklySales);
router.get('/dashboard/toproducts', mostSalesProducts);
router.get('/dashboard/salestrends', salesTrends);
router.get('/dashboard/paymentmethods', paymentMethods);
router.get('/dashboard/avgproduct', avgProduct);
router.get('/dashboard/avgmargin', avgMargin);
router.get('/dashboard/lowproduct', lowStockProducts);
router.get('/dashboard/categorydistribution', categoryDistribution);
router.get('/dashboard/topsuppliers', topSuppliers);

export default router;