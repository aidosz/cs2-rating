import { ISingleGameType } from '../../utils';
import { Table } from 'react-bootstrap';

interface MainPageProps {
  games: ISingleGameType[],
}

export const MainPage = ({games}: MainPageProps) => {

  return (
    <>
      <Table className="rankingTable" striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
          <th>Rank</th>
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
          games.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.user.nickname}</td>
              <td>{item.kills}</td>
              <td>{item.deaths}</td>
              <td>{item.assists}</td>
              <td>{item.hs}</td>
              <td>{item.damage.toLocaleString()}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </>
  );
};
