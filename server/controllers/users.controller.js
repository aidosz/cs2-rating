import { User } from '../models/models.js';
import { ApiError } from '../error/ApiError.js';

class UsersController {
  async create(req, res, next) {
    try {
      const user = await User.create(req.body)
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async createBulk(req, res, next) {
    try {
      const users = await User.bulkCreate(req.body);
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export let userController = new UsersController();
