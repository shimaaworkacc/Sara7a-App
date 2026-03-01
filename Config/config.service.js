import {resolve}from "node:path"
import dotenv from "dotenv"

const envPath={
    development:'dev.env',
    production:'prod.env'
}
// to change at production
dotenv.config({path:resolve(`./config/${envPath.development}`)});
export const PORT=process.env.PORT||500;
export const DB_URI=process.env.DB_URI;
export const SALT=Number(process.env.SALT);
export const TOKEN_ACCESS_SECRET_KEY=process.env.TOKEN_ACCESS_SECRET_KEY;
export const ACCESS_EXPIRES=Number(process.env.ACCESS_EXPIRES);
export const ENCRYPTION_SECRET_KEY=process.env.ENCRYPTION_SECRET_KEY