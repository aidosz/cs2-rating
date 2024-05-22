import { useEffect, useState } from 'react';
import { take, takeRight } from 'lodash';
import { Badge, ListGroup } from 'react-bootstrap';
import { ISingleGameType, User } from '../../../utils';
import { statsMap, StatsMapEnum } from '../../../utils/statsMap.tsx';
import './Stats.scss'

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
      <div className="stats">
        <h3 className="statsTitle">GW {selectedSerialNumber} - {statsMap[statProp].title}</h3>
        <h5>Max Pts</h5>
        <ListGroup as="ol" numbered>
          {
            take(sortedData, SORT_LIST_NUMBER).map((item, index) => (
              <>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={index}
                  variant="dark"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.user.username}</div>
                    {item.user.nickname}
                  </div>
                  <Badge bg="primary" pill>
                    {item.prop}
                  </Badge>
                </ListGroup.Item>
              </>
            ))
          }
        </ListGroup>

        <h5>Min Pts</h5>
        <ListGroup as="ol" numbered>
          {
            takeRight(sortedData, SORT_LIST_NUMBER).map((item, index) => (
              <>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={index}
                  variant="dark"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.user.username}</div>
                    {item.user.nickname}
                  </div>
                  <Badge bg="primary" pill>
                    {item.prop}
                  </Badge>
                </ListGroup.Item>
              </>
            ))
          }
        </ListGroup>
      </div>
    </>
  );
};
