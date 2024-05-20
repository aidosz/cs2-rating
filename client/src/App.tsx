import { Route, Routes } from 'react-router';
import { TotalPage } from './pages/TotalPage/TotalPage.tsx';
import classes from './App.module.scss';
import logo from './assets/cs2-logo.png';
import { Image, Stack } from 'react-bootstrap';
import topImage from './assets/fpllogo.png';
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { useState } from 'react';
import { NotFoundPage } from './pages';

function App() {
  const [serialNumber, setSerialNumber] = useState('');
  const handleSelectedNumber = (selectedNumber: string): void => {
    setSerialNumber(selectedNumber);
  }

  return (
    <>
      <div className="App">
        <div className="content">
          <Stack>
            <header>
              <a className={classes.logo} href="/">
                <img src={logo} alt="logo"/>
              </a>
              <div className={classes.headerBlock}>
                <div className={classes.live}>Live<span className={classes.liveIcon}></span></div>
                <div className={classes.standings}>Standings</div>
              </div>
            </header>
            <div className={classes.titleBlock}>
              <h1 className={classes.pageTitle}>
                CS2 Ranking, <span className={classes.gameSerialNumber}>GN {serialNumber}</span>
                <div className={classes.groupName}>ZhanikSTAN</div>
              </h1>
            </div>
            <div className={classes.topImage}>
              <Image src={topImage}></Image>
            </div>
          </Stack>

          <div className={classes.rankingTable}>
            <Routes>
              <Route path="/" element={ <MainPage onSelectedNumberChange={handleSelectedNumber} /> }/>
              <Route path="/total" element={ <TotalPage/> }/>
              <Route path="*" element={ <NotFoundPage/> }/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
