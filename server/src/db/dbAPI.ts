import mysql from 'mysql';
import getEnvVariable from '../utils/env_utils.js';

const connection = mysql.createConnection({
    host : await getEnvVariable("DB_URL"),
    user : await getEnvVariable("DB_USERNAME"),
    password : await getEnvVariable("DB_USERPASSWORD"),
    database : await getEnvVariable("DB_NAME")
});

connection.connect((error) => {
    if (error) Error(`Can't connect to the database ${error}`)
})

export default connection;