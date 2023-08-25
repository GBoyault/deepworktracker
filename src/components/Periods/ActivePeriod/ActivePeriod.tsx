import { useEffect, useState } from 'react';
import { Period } from '../../../models';

import Button from '../../UI/Button/Button';
import classes from './ActivePeriod.module.css';
import useDocumentTitle from '../../../views/TrackerView/useDocumentTitle';

type ActivePeriodProps = {
  period: Period,
  onClick: () => void
};


const ActivePeriod = (props: ActivePeriodProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const nowInSecond = Math.ceil(Date.now() / 1000);
    const startInSecond = Math.ceil(props.period.start / 1000);

    setCount(nowInSecond - startInSecond);
  }, [props.period.start]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1000)

    return () => clearInterval(timer);
  });

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  const twoDigitsSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  const formattedCount = `${minutes}:${twoDigitsSeconds}`;

  useDocumentTitle(`Tracking: ${formattedCount}`);

  return (
    <div className={classes['active-period']}>
      <div className={classes.timer}>
        {formattedCount}
      </div>
      <div className={classes.actions}>
        <Button onClick={props.onClick}>Arrêter</Button>
      </div>
    </div>
  )
}

export default ActivePeriod;