import express from "express";
import usersRouter from './users.routes.js';
import gamesRouter from './games.routes.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/games', gamesRouter);

export default router;
