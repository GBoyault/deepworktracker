import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { Project, Period as PeriodType } from '../../../models';
import Period from '../Period/Period';
import Modal from '../../UI/Modal/Modal';
import EditPeriod from '../EditPeriod/EditPeriod';
import { PeriodDuration } from '../../../utils/period-duration';
import classes from './PeriodList.module.css';

type PeriodListProp = {
  periods: PeriodType[],
  projects: Project[],
  lastCreatedProject: Project | null,
  onCreateProject: () => void,
  onDeletePeriod: (periodId: string) => void,
  onUpdatePeriod: (periodData: PeriodType) => void
}


const PeriodList = (props: PeriodListProp) => {
  const [periodToEdit, setPeriodToEdit] = useState<PeriodType | null>(null);
  const { periods } = props;

  const editPeriodHandler = (period: PeriodType) => {
    setPeriodToEdit(period);
  };

  const updatedPeriodHandler = (updatedPeriod: PeriodType) => {
    props.onUpdatePeriod(updatedPeriod);
    setPeriodToEdit(null);
  }

  const deletePeriodHandler = () => {
    if (periodToEdit) {
      props.onDeletePeriod(periodToEdit.id);
    }
    setPeriodToEdit(null);
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
          <h2>Aujourdhui :</h2>
          <div className={classes.details}>
            <span className={classes.success}>{formattedTotal}</span> de concentration
            {interruptions.length > 0 && (
              <>/ <span className={classes.failure}>{interruptions.length}</span> interruptions</>
            )}
          </div>
        </header >

        {
          periods.map(period => (
            <Period
              key={period.id}
              period={period}
              onClick={editPeriodHandler.bind(null, period)}
            />
          ))
        }
      </div >
      {periodToEdit && (
        <Modal onClose={() => setPeriodToEdit(null)}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <EditPeriod
              period={periodToEdit}
              projects={props.projects}
              lastCreatedProject={props.lastCreatedProject}
              onDelete={deletePeriodHandler}
              onSave={updatedPeriodHandler}
              onCancel={() => setPeriodToEdit(null)}
              onCreateProject={props.onCreateProject}
            />
          </LocalizationProvider>
        </Modal>
      )}
    </>
  );
};

export default PeriodList;