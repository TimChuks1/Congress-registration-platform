import express from "express";
import { adminSignUp, adminLogin } from "../controllers/adminController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/signup", adminSignUp);
router.post("/login", adminLogin);

export default router;