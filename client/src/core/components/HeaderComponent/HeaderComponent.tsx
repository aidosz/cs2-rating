import classes from './Header.module.scss';
import { Container, Image, Nav, Navbar, Stack } from 'react-bootstrap';
import topImage from '../../../assets/fpllogo.png';
import { useLocation } from 'react-router';

interface HeaderComponentProps {
  serialNumber: string
}

export const HeaderComponent = ({serialNumber}: HeaderComponentProps) => {
  const location = useLocation();
  return (
    <>
      <div className={classes.navigation}>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">
              <span className={classes.logoText}>Zhanikstan</span>
            </Navbar.Brand>
            <Nav activeKey={location.pathname} className="me-auto">
              <Nav.Link href="/">Ranking</Nav.Link>
              <Nav.Link href="/stats">Stats</Nav.Link>
              <Nav.Link href="/gamers">Gamers</Nav.Link>
              <Nav.Link href="/total">Total</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Stack>
        <div className={classes.titleBlock}>
          <h1 className={classes.pageTitle}>
            CS2 Ranking, <span className={classes.gameSerialNumber}>GW-{serialNumber}</span>
          </h1>
        </div>
        <div className={classes.topImage}>
          <Image src={topImage}></Image>
        </div>
      </Stack>
    </>
  );
};
