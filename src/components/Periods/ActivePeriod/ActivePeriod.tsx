import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { type Period } from '../../../models'
import { Button } from '../../UI/'
import classes from './ActivePeriod.module.css'
import { useDocumentTitle } from '../../../hooks/'

interface ActivePeriodProps {
  period: Period
  onClick: () => void
}

export const ActivePeriod = ({ period, onClick }: ActivePeriodProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const nowInSecond = Math.ceil(Date.now() / 1000)
    const startInSecond = Math.ceil(period.start / 1000)

    setCount(nowInSecond - startInSecond)
  }, [period.start])

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1000)

    return () => { clearInterval(timer) }
  })

  const minutes = Math.floor(count / 60)
  const seconds = count % 60

  const twoDigitsSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  const formattedCount = `${minutes}:${twoDigitsSeconds}`

  useDocumentTitle(`Tracking: ${formattedCount}`)

  return (
    <motion.div
      className={classes['active-period']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className={classes.timer}>
        {formattedCount}
      </div>
      <div className={classes.actions}>
        <Button onClick={onClick}>Arrêter</Button>
      </div>
    </motion.div>
  )
}
