import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import './App.css';
import { ConvertTimestamp } from './ConvertTimestamp';
import CurrentUnixTimestamp from './CurrentTimestamp';
dayjs.extend(utc);
dayjs.extend(timezone);

function App() {
  return (
    <>
      <CurrentUnixTimestamp />
      <ConvertTimestamp />
    </>
  )
}

export default App
