import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITotalGameType } from '../../utils';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const TotalPage = () => {
  const [data, setData] = useState<ITotalGameType[]>([]);

  useEffect(() => {
    axios.get('/games/total')
      .then(response => {
        setData(response.data);
        console.log('response.data: ', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <Link to="/">
          <Button variant="dark">Ranking by games</Button>
        </Link>
        <Table className="rankingTable" striped bordered hover variant="dark" responsive>
          <thead>
          <tr>
            <th>Rank</th>
            <th>Game played</th>
            <th>Player</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
            <th>HS</th>
            <th>Damage</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{item.game_played}</td>
                <td>{item.user.nickname}</td>
                <td>{item.total_kills}</td>
                <td>{item.total_deaths}</td>
                <td>{item.total_assists}</td>
                <td>{item.total_hs}</td>
                <td>{item.total_damage}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    </>
  );
};
