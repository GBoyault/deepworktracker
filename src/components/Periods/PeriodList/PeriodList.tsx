import { useState } from 'react';
import { Period as PeriodType } from '../../../models/models';
import Period from '../Period/Period';
import Modal from '../../UI/Modal/Modal';
import EditPeriod from '../EditPeriod/EditPeriod';
import { PeriodDuration } from '../../../utils/period-duration';
import classes from './PeriodList.module.css';

type PeriodListProp = {
  periods: PeriodType[]
}


const PeriodList = (props: PeriodListProp) => {
  const [periodToEdit, setPeriodToEdit] = useState<PeriodType | null>(null);
  const { periods } = props;

  const editPeriodHandler = (period: PeriodType) => {
    setPeriodToEdit(period);
  };

  const periodDurations = periods.map(period => new PeriodDuration(period.start, period.end));
  const interruptions = periodDurations.filter(duration => duration.isTooShort);
  const totalDurationInMinuts = periodDurations.reduce((acc, cur) => {
    return acc + cur.diffInMinuts;
  }, 0);
  const formattedTotal = PeriodDuration.formatDuration(totalDurationInMinuts);


  return (
    <>
      <div className={classes['period-list']}>
        <header>
          <h2>Aujourdhui :<br />
            {formattedTotal} <small>de concentration</small><br />
            {interruptions.length} <small>interruptions</small></h2>
        </header>

        {periods.map(period => (
          <Period
            key={period.id}
            period={period}
            onClick={editPeriodHandler.bind(null, period)}
          />
        ))}
      </div>
      {periodToEdit && (
        <Modal onClose={() => setPeriodToEdit(null)}>
          <EditPeriod period={periodToEdit} />
        </Modal>
      )}
    </>
  );
};

export default PeriodList;