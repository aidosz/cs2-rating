import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export const Game = sequelize.define('game', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  serial_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kills: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deaths: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assists: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hs: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  adr: {
    type: DataTypes.INTEGER
  },
  rounds_number: {
    type: DataTypes.INTEGER
  },
  damage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});

User.hasOne(Game);
Game.belongsTo(User);
