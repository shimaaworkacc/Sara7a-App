import { Router } from "express";
import * as userService from "./user.service.js"
const router = Router();

router.post("/api/login",userService.getProfile);


export default router;
