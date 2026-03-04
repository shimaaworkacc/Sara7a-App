import { Router } from "express";
import * as userService from "./user.service.js"
const router = Router();

router.post("/getProfile",userService.getProfile);


export default router;
