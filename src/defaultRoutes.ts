import express from 'express';
import CommonRoute from './common/routes/index';


const router = express.Router();

router.use(CommonRoute);

export default router;