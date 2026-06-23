import { Router } from "express";

const router = Router();

import loginRoutes from './auth/login.js'

router.use(loginRoutes);
    
export default router;