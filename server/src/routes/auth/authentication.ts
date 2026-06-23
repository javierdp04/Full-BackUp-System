import { Router } from "express";
import jwt from "jsonwebtoken";
import getEnvVariable from "../../utils/env_utils.js";
import { raw } from "mysql";

const router = Router();

router.get("/verify", async (req, res, next) => {
    const rawToken : string | undefined = req.headers.authorization;

    if(!rawToken || rawToken?.length === 0){
        return res.status(401).json({
            error : "Auth error"
        })
    }

    const token : string | undefined = rawToken!.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            error : "Auth error"
        });
    };

    const secretKey = await getEnvVariable("SECRET_KEY");

    try {
        const payload = jwt.verify(token as string, secretKey);

        (req as any).user = payload;

        return res.json({valid : true, user: payload});
    } catch (err) {
        res.status(403).json({error : "Invalid token"});
    }
})