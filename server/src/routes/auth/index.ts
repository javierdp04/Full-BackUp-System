import Router from "express";

import authRouter from "./authentication.ts";
import loginRouter from "./login.ts";

const router = Router();

router.use(authRouter);
router.use(loginRouter);

export default router;