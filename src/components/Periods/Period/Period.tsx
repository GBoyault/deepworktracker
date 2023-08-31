import { type Period as PeriodType } from '../../../models'
import classes from './Period.module.css'
import { PeriodDuration } from '../../../utils/period-duration'

interface periodProps {
  period: PeriodType
  isLast: boolean
  onClick: () => void
}

const Period = ({ period, isLast, onClick }: periodProps) => {
  const { start, end, description, project } = period

  const periodDuration = new PeriodDuration(start, end)
  const timing = periodDuration.formattedStartToEnd()
  const duration = periodDuration.formattedDuration

  const periodClasses = [classes.period]

  if (periodDuration.isTooShort) {
    periodClasses.push(classes['period--too-short'])
  }

  if (isLast) {
    periodClasses.push(classes['period--last'])
  }

  return (
    <div
      className={periodClasses.join(' ')}
      onClick={onClick} title='Éditer'
    >
      <div className={classes.duration}>{duration}</div>
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
    </div >
  )
}

export default Period
