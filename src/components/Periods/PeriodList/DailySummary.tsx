import { useContext } from 'react'
import { type Period } from '../../../models'
import { PeriodDuration } from '../../../utils/period-duration'
import { SettingsContext } from '../../../contexts/SettingsContext'
import classes from './DailySummary.module.css'

interface DailySummaryProp {
  periods: Period[]
};

export const DailySummary = ({ periods }: DailySummaryProp) => {
  const { theme, minDuration } = useContext(SettingsContext)
  const periodDurations = periods.map(period => new PeriodDuration(period.start, period.end, minDuration))
  const interruptions = periodDurations.filter(duration => duration.isTooShort)

  const totalDurationInMinuts = periodDurations.reduce((acc, cur) => {
    return acc + cur.diffInMinuts
  }, 0)
  const interruptionsDuration = interruptions.reduce((acc, cur) => {
    return acc + cur.diffInMinuts
  }, 0)

  const formattedTotal = PeriodDuration.formatDuration(
    totalDurationInMinuts - interruptionsDuration
  )

  const className = theme === 'dark'
    ? classes['daily-summary']
    : `${classes['daily-summary']} ${classes['daily-summary--theme-light']}`

  return (
    <header className={className}>
      <h2>Aujourdhui :</h2>
      <div className={classes.details}>
        {totalDurationInMinuts > 0 && (
          <div className={classes.detail}>
            <span className={classes.success}>{formattedTotal}</span>
            <span className={classes.label}>concentration</span>
          </div>
        )}
        {interruptions.length > 0 && (
          <div className={classes.detail}>
            <span className={classes.failure}>{interruptions.length}</span>
            <span className={classes.label}>
              {interruptions.length > 1 ? 'interruptions' : 'interruption'}
            </span>
          </div>
        )}
      </div>
    </header >
  )
}
