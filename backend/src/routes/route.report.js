import {  addReport,deleteReport,updateReport,allReports} from '../controllers/report.controller.js';
import {Router} from 'express';
import authenticateToken from '../middelwares/autenticateToken.js';

const router = Router();

router.get('/get/report',authenticateToken, allReports);
router.post('/add/report',authenticateToken, addReport);
router.put('/update/report/:id',authenticateToken, updateReport);
router.delete('/delete/report/:id',authenticateToken, deleteReport);

export default router;
