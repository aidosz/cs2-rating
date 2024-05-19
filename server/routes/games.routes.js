import express from 'express';
import { gamesController } from '../controllers/games.controller.js';

const router = express.Router();

router.get('/total', gamesController.getTotal);
router.get('/list', gamesController.getSerialNumberList);
router.get('/', gamesController.getAll);
router.get('/:serialNumber', gamesController.getGameBySerialNumber);
router.post('/', gamesController.create);
router.post('/create-bulk', gamesController.createBulk);

export default router;
