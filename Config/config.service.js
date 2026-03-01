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
