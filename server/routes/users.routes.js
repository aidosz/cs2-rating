import express from "express";
import { userController } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.post('/create-bulk', userController.createBulk);

export default router;
