import { ACCESS_EXPIRES, TOKEN_ACCESS_SECRET_KEY } from "../../../Config/config.service.js";
import { findOne, create } from "../../DB/database.repository.js";
import userModel from "../../DB/Models/user.model.js";
import { HashEnum } from "../../Utils/Enums/security.enum.js";
import { BadRequestException, ConflictRequestException, NotFoundRequestException } from "../../Utils/Response/error.response.js";
import { SuccessResponse } from "../../Utils/Response/success.response.js";
import { encrypt } from "../../Utils/Security/encryption.security.js";
import { compareHash, generateHash } from "../../Utils/Security/hash.security.js";
import jwt from "jsonwebtoken";
////////////////////////////////////////////////////////////////////////////////////////////////////////
export const signup = async (req, res) => {
    const {firstName, lastName, email, password,phone} = req.body;

    if (await findOne({ model: userModel, filter: { email } })) 
        throw ConflictRequestException({ message: "already exists" });

    const hashedPassword = await generateHash({plainText:password,algo: HashEnum.Argon});
    const encryptedData=encrypt(phone);

    const user = await create({
        model: userModel, data: [
            { firstName, lastName, email, password: hashedPassword,encryptedData }
        ]
    });
    return SuccessResponse({ res, statusCode: 201, message: "User created successfully", data: { user } })
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findOne({
        model: userModel, filter: { email }
    });
    if (!user) 
        throw NotFoundRequestException(({ message: "User not found" }));
    const isPasswordValid = await compareHash({ plainText: password, cipherText: user.password, algo: HashEnum.Argon});
    if (!isPasswordValid) throw BadRequestException(({ message: "Invalid email or password" }));
    const accessToken=jwt.sign({id:user._id,email:user.email},TOKEN_ACCESS_SECRET_KEY,{
        expiresIn:ACCESS_EXPIRES,
        issuer:"http://localhost:3000",
        audience:"http://localhost:4200",
        // jwtid:user._id.toString(),
        // notBefore:0,
        // noTimestamp:true
    });
    return SuccessResponse({ res, statusCode: 200, message: "Login success", data: accessToken })
}