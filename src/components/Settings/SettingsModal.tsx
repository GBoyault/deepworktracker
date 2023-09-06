import { useContext } from 'react'
import { MinDurationContext } from '../../contexts/MinDurationContext'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import Button from '../UI/Button/Button'
import classes from './Settings.module.css'

interface SettingsModalProps {
  onClose: () => void
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { minDuration, setMinDuration } = useContext(MinDurationContext)

  const valueText = (value: number) => {
    return `${value} min`
  }

  const sliderChangeHandler = (e: Event, newValue: number | number[]) => {
    setMinDuration(newValue as number)
  }

  return (
    <div className={classes['settings-modal']}>
      <h2>Paramètres</h2>
      {/* dark/light theme switcher... */}
      <div>Durée minimum d'une période valide : <span className={classes.value}>{minDuration} minutes</span></div>
      <div className={classes['input-box']}>
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Temperature"
            getAriaValueText={valueText}
            value={minDuration}
            onChange={sliderChangeHandler}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={10}
            max={50}
          />
        </Box>
      </div>
      <div className={classes.actions}>
        <Button onClick={onClose}>Fermer</Button>
      </div>
    </div>
  )
}

export default SettingsModal
