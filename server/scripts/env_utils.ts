import "dotenv/config";
import process = require("node:process");

const getEnvVariable = async (name : string) : Promise<string> => {
    const value = process.env[name];

    if(!value || value.length == 0 ) throw Error(`Can't find ${name} on dotenv`);
    
    return value;
}

export default getEnvVariable;