import * as dbService from "../../DB/database.repository.js"
import { SuccessResponse } from "../../Utils/Response/success.response.js"
import { decrypt } from "../../Utils/Security/encryption.security.js"
import userModel from "../../DB/Models/user.model.js"
import jwt from "jsonwebtoken"
import { TOKEN_ACCESS_SECRET_KEY } from "../../../Config/config.service.js"

export const getProfile = async (req, res) => {
const {authorization} = req.headers;
const decoded = jwt.verify(authorization, TOKEN_ACCESS_SECRET_KEY);
    const user = await dbService.findById({ model: userModel, id: decoded.id });
    console.log('User found:', user);
    console.log('User phone:', user?.phone);
    
    if (user && user.phone) {
        try {
            user.phone = await decrypt(user.phone)
        } catch (error) {
            console.error('Decryption error:', error)
            user.phone = null; 
        }
    }
    SuccessResponse({ res, statusCode: 200, message: "User profile", data: user })
}   