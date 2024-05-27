import { Route, Routes, useLocation } from 'react-router';
import { TotalPage } from './pages/TotalPage/TotalPage.tsx';
import classes from './App.module.scss';
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { useEffect, useState } from 'react';
import { NotFoundPage } from './pages';
import { StatPage } from './pages/StatPage/StatPage.tsx';
import { HeaderComponent } from './core/components/HeaderComponent/HeaderComponent.tsx';
import { Form } from 'react-bootstrap';
import { IGameSerialNumber, ISingleGameType } from './utils';
import axios from 'axios';
import { GamersPage } from './pages/GamersPage/GamersPage.tsx';
import { AdminPage } from './pages/AdminPage/AdminPage.tsx';

function App() {
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [data, setData] = useState<ISingleGameType[]>([]);
  const [serialNumberList, setSerialNumberList] = useState<IGameSerialNumber[]>([]);

  const pathname = useLocation().pathname;
  const pagesWithHiddenSelectBlock = ['total', 'gamers'];
  const hideSelectBlock = pagesWithHiddenSelectBlock.some(i => pathname.includes(i));

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
    const initialValue: string = serialNumberList?.[0]?.serial_number;
    setSerialNumber(initialValue);
  }, [serialNumberList]);

  useEffect(() => {
    if (!serialNumber) {
      return;
    }

    axios.get(`/games/${serialNumber}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [serialNumber]);

  return (
    <>
      <div className="App">
        <div className="content">
          <div className="container">
            <HeaderComponent serialNumber={serialNumber}></HeaderComponent>
            <div className={classes.formGroup}>
              {
                !hideSelectBlock &&
                <Form.Select
                  className={classes.formSelect}
                  onChange={e => setSerialNumber(e.target.value)}
                  defaultValue={serialNumber}
                  name="serialNumber"
                  data-bs-theme="dark"
                >
                  {
                    serialNumberList.map((item, index) => (
                      <option value={item.serial_number} key={index}>GW-{item.serial_number}</option>
                    ))
                  }
                </Form.Select>
              }
            </div>
            <div className={classes.rankingTable}>
              <Routes>
                <Route path="/" element={<MainPage games={data}/>}/>
                <Route path="/stats" element={<StatPage games={data} selectedSerialNumber={serialNumber} />}/>
                <Route path="/gamers" element={<GamersPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/total" element={<TotalPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
