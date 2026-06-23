import { Router } from "express";
import bcrypt from "bcrypt"
import { hashedPasswordFromDB } from "../../utils/auth.js";
import jwt from "jsonwebtoken";
import getEnvVariable from "../../utils/env_utils.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let hashInDb;

    try{
        hashInDb = await hashedPasswordFromDB(username);
    }catch(error){
        return res.status(401).json({error : "Credenciales incorrectas o error en el servidor"});
    }

    const comparationResult : boolean = await bcrypt.compare(password, hashInDb);

    if(!comparationResult) {
        return res.status(401).json({
            error : "Usuario o contraseña incorrectos"
        });
    }
    
    const secretKey = await getEnvVariable("SECRET_KEY");
    const token = jwt.sign({
        username : username},
        secretKey,
        {expiresIn : '1h'}
    );

    return res.json({
        status : "ok",
        token : token
    })
})

export default router;