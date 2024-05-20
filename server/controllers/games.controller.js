import { Game } from '../models/models.js';
import { ApiError } from '../error/ApiError.js';
import sequelize from '../db.js';

class GamesController {
  async create(req, res, next) {
    try {
      const game = await Game.create(req.body);
      return res.json(game);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const games = await Game.findAll();
    return res.json(games);
  }

  async getSerialNumberList(req, res) {
    const games = await Game.findAll({
      attributes: [
        'serial_number',
      ],
      group: 'serial_number',
      order: [
        ['serial_number', 'DESC']
      ]
    });
    return res.json(games);
  }

  async getGameBySerialNumber(req, res, next) {
    const { serialNumber } = req.params;

    if (!serialNumber) {
      return next(ApiError.badRequest('Не указан ID'))
    }

    try {
      const game = await Game.findAll({
        where: { serial_number: serialNumber },
        include: ['user'],
      });

      return res.json(game);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getTotal(req, res, next) {
    try {
      const game = await Game.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('nickname')), 'game_played'],
          [sequelize.fn('SUM', sequelize.col('kills')), 'total_kills'],
          [sequelize.fn('SUM', sequelize.col('deaths')), 'total_deaths'],
          [sequelize.fn('SUM', sequelize.col('assists')), 'total_assists'],
          [sequelize.fn('SUM', sequelize.col('hs')), 'total_hs'],
          [sequelize.fn('SUM', sequelize.col('damage')), 'total_damage'],
        ],
        group: 'nickname',
        include: ['user'],
        order: [
          ['total_damage', 'DESC']
        ]
      });

      return res.json(game);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createBulk(req, res, next) {
    try {
      const games = await Game.bulkCreate(req.body);
      return res.json(games);
    } catch (e) {
      console.log('ERROR',e)
      next(ApiError.badRequest(e.message))
    }
  }
}

export let gamesController = new GamesController();
