import { useEffect, useState } from 'react';
import { IGameSerialNumber, ISingleGameType } from '../../utils';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import classes from './MainPage.module.scss';
import { Link } from 'react-router-dom';

interface MainPageProps {
  onSelectedNumberChange?: (selectedNumber: string) => void
}

export const MainPage = ({onSelectedNumberChange}: MainPageProps) => {
  const [selectedSerialNumber, setSelectedSerialNumber] = useState<string>();
  const [data, setData] = useState<ISingleGameType[]>([]);
  const [serialNumberList, setSerialNumberList] = useState<IGameSerialNumber[]>([]);

  useEffect(() => {
    axios.get('/games/list')
      .then(response => {
        setSerialNumberList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!selectedSerialNumber) {
      return;
    }

    axios.get(`/games/${selectedSerialNumber}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedSerialNumber]);

  useEffect(() => {
    const initialValue: string = serialNumberList?.[0]?.serial_number;
    onSelectedNumberChange && onSelectedNumberChange(initialValue);
    setSelectedSerialNumber(initialValue);
  }, [serialNumberList]);

  function onNumberChange(serialNumber: string) {
    console.log('serialNumber: ', serialNumber);
    onSelectedNumberChange && onSelectedNumberChange(serialNumber);
    setSelectedSerialNumber(serialNumber);
  }

  return (
    <>
      <div className="container">
        <div className={classes.formGroup}>
          <Link to="/total">
            <Button variant="dark">Total Ranking</Button>
          </Link>
          <Form.Select
            className={classes.formSelect}
            onChange={e => onNumberChange(e.target.value)}
            defaultValue={selectedSerialNumber}
            name="serialNumber"
            data-bs-theme="dark"
          >
            {
              serialNumberList.map((item, index) => (
                <option value={item.serial_number} key={index}>Game serial number: {item.serial_number}</option>
              ))
            }
          </Form.Select>
        </div>
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
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.user.nickname}</td>
                <td>{item.kills}</td>
                <td>{item.deaths}</td>
                <td>{item.assists}</td>
                <td>{item.hs}</td>
                <td>{item.damage}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    </>
  );
};
