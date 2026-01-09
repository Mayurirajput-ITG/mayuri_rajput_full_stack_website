
import express from "express";
import { createAdminController, authenticateUser } from "../controller/authController.js";
import { userList,getUserById ,userUpdateById,userDeleteById} from "../controller/userController.js";
import { exportCustomers,importCustomer } from "../services/userService.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// POST /api/auth/login
router.post("/register", createAdminController);
router.post("/login", authenticateUser);
router.get("/users", userList);
router.get("/users/:id",getUserById);
router.put("/users/:id",userUpdateById);
router.delete("/users/:id",userDeleteById);
router.get("/customer/export",exportCustomers);
router.post("/customer/import",upload.single("file"),importCustomer)
export default router;
