import { error } from "console";
import connection from "../db/dbAPI.js";
import crypto from "crypto";

const hashedPasswordFromDB = async (username : string) : Promise<string> => {
    let qry = `select hashedPassword from User where username= ?;`
    
    return new Promise((resolve, reject) => {
        connection.query(qry, [username], (error, results) => {
            if(error) reject(error);

            if(results.length === 0) return reject(new Error("Usuario no encontrado"));

            const hashedPassword = results[0].hashedPassword;

            return hashedPassword;
        })
    })
};

const hashPassword = async (password : string) : Promise<string> => {
    const salt = crypto.randomBytes(16).toString('hex');
    return new Promise<string>(async (resolve, reject) => {
        crypto.scrypt(password, salt,  64, (error, derivedKey) => {
            if(error) throw error;

            const hash = derivedKey.toString('hex');

            resolve(`${salt}.${hash}`);
        });
    });
};



export {hashedPasswordFromDB, hashPassword};