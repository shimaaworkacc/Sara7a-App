import { findOne, create } from "../../DB/database.repository.js";
import userModel from "../../DB/Models/user.model.js";
import { HashEnum } from "../../Utils/Enums/security.enum.js";
import { BadRequestException, ConflictRequestException, NotFoundRequestException } from "../../Utils/Response/error.response.js";
import { SuccessResponse } from "../../Utils/Response/success.response.js";
import { compareHash, generateHash } from "../../Utils/Security/hash.security.js";
export const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if (await findOne({ model: userModel, filter: { email } })) 
        throw ConflictRequestException({ message: "already exists" });

    const hashedPassword = await generateHash({plainText:password,algo: HashEnum.Argon});

    const user = await create({
        model: userModel, data: [
            { firstName, lastName, email, password: hashedPassword }
        ]
    });
    return SuccessResponse({ res, statusCode: 201, message: "User created successfully", data: { user } })
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findOne({
        model: userModel, filter: { email }
    });
    console.log(user);
    if (!user) {
        throw NotFoundRequestException(({ message: "User not found" }))
    }

    const isPasswordValid = await compareHash({ plainText: password, cipherText: user.password, algo: HashEnum.Argon});
    if (!isPasswordValid) throw BadRequestException(({ message: "Invalid email or password" }))
    return SuccessResponse({ res, statusCode: 200, message: "Login success", data: { user } })
}