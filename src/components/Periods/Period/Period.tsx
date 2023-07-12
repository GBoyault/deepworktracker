import { Period as PeriodType } from '../../../models/models';
import classes from './Period.module.css';
import { PeriodDuration } from '../../../utils/period-duration';


type periodProps = {
  period: PeriodType,
  onClick: () => void
};


const Period = (props: periodProps) => {
  const { start, end, description, project } = props.period;

  const periodDuration = new PeriodDuration(start, end);
  const timing = periodDuration.formattedStartToEnd();
  const duration = periodDuration.formattedDuration;

  const durationClasses = [classes.duration];

  if (periodDuration.isTooShort) {
    durationClasses.push(classes['duration--too-short'])
  }

  return (
    <div className={classes.period} onClick={props.onClick} title='Éditer'>
      <div className={durationClasses.join(' ')}>{duration}</div>
      <div className={classes.content}>
        <div className={classes.timing}>{timing}</div>
        <div className={classes.description}>{description}</div>
        {project && (
          <>
            <div className={classes.project} style={{ color: project.color }}>
              {project.name}
            </div>
            <div className={classes['project-border']} style={{ background: project.color }} aria-hidden="true"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Period;