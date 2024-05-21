export interface IGameType {
  nickname: string;
  id: string;
  serial_number: string;
  kills: string;
  damage: string;
  assists: string;
  hs: string;
  adr: string;
  rounds_number: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  game_played: string;
}

export interface ITotalGameType {
  total_kills: string;
  total_damage: string;
  total_deaths: string;
  total_assists: string;
  total_hs: string;
  game_played: string;
  user: User
}

export interface User {
  nickname: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGameSerialNumber {
  serial_number: string;
}

export interface ISingleGameType {
  id: string;
  serial_number: number;
  kills: number;
  deaths: number;
  assists: number;
  hs: number;
  adr?: any;
  rounds_number: number;
  damage: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  userNickname: string;
  user: User;
}
