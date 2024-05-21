export enum StatsMapEnum {
  KILLS = 'kills',
  DEATHS = 'deaths',
  ASSISTS = 'assists',
  HS = 'hs'
}

interface IStatsMap {
  [key: string]: {
    [key: string]: string;
  }
}

export const statsMap: IStatsMap = {
  "kills": {
    "title": "Kills Stats",
  },
  "deaths": {
    "title": "Deaths Stats",
  },
  "assists": {
    "title": "Assists Stats",
  },
  "hs": {
    "title": "Head shots Stats",
  },
}
