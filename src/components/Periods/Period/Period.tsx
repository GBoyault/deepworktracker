import { useContext } from 'react'
import { type Period as PeriodType } from '../../../models'
import { SettingsContext } from '../../../contexts/SettingsContext'
import { PeriodDuration } from '../../../utils/period-duration'

import classes from './Period.module.css'

interface periodProps {
  period: PeriodType
  isLast: boolean
  onClick: () => void
}

const Period = ({ period, isLast, onClick }: periodProps) => {
  const { start, end, description, project } = period
  const { theme, minDuration } = useContext(SettingsContext)

  const periodDuration = new PeriodDuration(start, end, minDuration)
  const timing = periodDuration.formattedStartToEnd()
  const duration = periodDuration.formattedDuration

  const periodClasses = [classes.period]

  if (theme === 'light') {
    periodClasses.push(classes['period--theme-light'])
  }

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
