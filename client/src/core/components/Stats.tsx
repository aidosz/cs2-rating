import classes from '../../pages/MainPage/MainPage.module.scss';
import { ISingleGameType, User } from '../../utils';
import { useEffect, useState } from 'react';
import { statsMap, StatsMapEnum } from '../../utils/statsMap.tsx';
import { take, takeRight } from 'lodash';

const SORT_LIST_NUMBER = 3;

interface IStatsProps {
  game: ISingleGameType[]
  statProp: StatsMapEnum;
  selectedSerialNumber: string | undefined;
}

interface ISortKey {
  prop: string;
  user: User;
}

export const Stats = ({game, statProp, selectedSerialNumber}: IStatsProps) => {
  const [sortedData, setSortedData] = useState<ISortKey[]>([])

  function getSortedMap(game: ISingleGameType[], statProp: string): ISortKey[] {
    return game.map((item: any): ISortKey => (
      {
        prop: item[statProp],
        user: item.user
      })
    ).sort((a: ISortKey, b: ISortKey) => {
      // @ts-ignore
      return b.prop - a.prop;
    });
  }

  useEffect(() => {
    setSortedData(getSortedMap(game, statProp));
  }, [game, statProp]);

  return (
    <>
      <div className={classes.stats}>
        <h3 className={classes.statsTitle}>GW {selectedSerialNumber} - {statsMap[statProp].title}</h3>
        <h5>Max Pts</h5>
        <ol>
          {
            take(sortedData, SORT_LIST_NUMBER).map((item, index) => (
              <li key={index}>{item.user.username} - {item.prop} - [{item.user.nickname}]</li>
            ))
          }
        </ol>

        <h5>Min Pts</h5>
        <ol>
          {
            takeRight(sortedData, SORT_LIST_NUMBER).map((item, index) => (
              <li key={index}>{item.user.username} - {item.prop} - [{item.user.nickname}]</li>
            ))
          }
        </ol>
      </div>
    </>
  );
};
