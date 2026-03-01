import crypto from 'node:crypto';
import { ENCRYPTION_SECRET_KEY } from '../../../Config/config.service.js';
const IV_LENGTH = 16;

export const encrypt = async (text) => {

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_SECRET_KEY, iv);
    console.log(cipher);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    console.log(encryptedData);
    encryptedData += cipher.final("hex");

    return `${iv.toString("hex")}:${encryptedData}`

}
export const decrypt = async (encryptedData) => {

   const [iv,encryptedText]=encryptedData.split(":");
   const binaryLike=Buffer.from(iv,"hex");
   const decipher=crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_SECRET_KEY,binaryLike);
   console.log(decipher);
   let decryptedData=decipher.update(encryptedText,"hex","utf-8");
   decryptedData+= decipher.final("utf-8");
   return decryptedData;
}