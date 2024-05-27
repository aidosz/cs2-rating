import { ISingleGameType } from '../../utils';
import { StatsMapEnum } from '../../utils/statsMap.tsx';
import { Tab, Tabs } from 'react-bootstrap';
import { Stats } from '../../core/components/StatsComponent/Stats.tsx';

interface StatPageProps {
  games: ISingleGameType[],
  selectedSerialNumber: string
}

export const StatPage = ({games, selectedSerialNumber}: StatPageProps) => {

  return (
    <>
      <Tabs
        defaultActiveKey={StatsMapEnum.KILLS}
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey={StatsMapEnum.KILLS} title="Kills">
          <Stats game={games} statProp={StatsMapEnum.KILLS} selectedSerialNumber={selectedSerialNumber}></Stats>
        </Tab>
        <Tab eventKey={StatsMapEnum.DEATHS} title="Deaths">
          <Stats game={games} statProp={StatsMapEnum.DEATHS} selectedSerialNumber={selectedSerialNumber}></Stats>
        </Tab>
        <Tab eventKey={StatsMapEnum.ASSISTS} title="Assists">
          <Stats game={games} statProp={StatsMapEnum.ASSISTS} selectedSerialNumber={selectedSerialNumber}></Stats>
        </Tab>
        <Tab eventKey={StatsMapEnum.HS} title="Headshots">
          <Stats game={games} statProp={StatsMapEnum.HS} selectedSerialNumber={selectedSerialNumber}></Stats>
        </Tab>
      </Tabs>
    </>
  );
};
