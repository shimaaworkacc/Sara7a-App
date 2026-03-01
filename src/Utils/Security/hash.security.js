import {hash,compare} from "bcrypt";
import * as Argon2 from "argon2";
import { HashEnum } from "../Enums/security.enum.js";
import { SALT } from "../../../Config/config.service.js";

export const generateHash=async({plainText,salt=SALT,algo=HashEnum.Bcryp})=>{
let hashResult="";
switch(algo){
    case HashEnum.Bcryp:
        hashResult=await hash(plainText,salt);
        break;
    case HashEnum.Argon:
        hashResult=await Argon2.hash(plainText);
        break;
    default:
        hashResult=await hash(plainText,salt);
        break;
}
return hashResult;
}
export const compareHash=async({plainText,cipherText,algo=HashEnum.Bcryp})=>{
let match=false;
switch(algo){
    case HashEnum.Bcryp:
        match=await compare(plainText,cipherText);
        break;
    case HashEnum.Argon:
        match=await Argon2.verify(cipherText,plainText);
        break;
    default:
        match=await compare(plainText,cipherText);
        break;
}
return match;
}