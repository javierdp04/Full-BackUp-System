import { Router } from "express";

const router = Router();

import loginRoutes from './auth/index.ts'

router.use("/auth", loginRoutes);
    
export default router;