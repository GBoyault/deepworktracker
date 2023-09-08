import { useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import PurpleThemeProvider from '../../utils/mui-purple-provider'

import { Button } from '../UI/'
import classes from './Settings.module.css'

interface SettingsModalProps {
  onClose: () => void
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { minDuration, setMinDuration, theme, switchTheme } = useContext(SettingsContext)

  const themeText = theme === 'dark' ? 'Mode sombre' : 'Mode clair'

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
      <PurpleThemeProvider>
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
              color='secondary'
            />
          </Box>
        </div>
        <FormGroup>
          <FormControlLabel control={<Switch
            checked={theme === 'dark'}
            onChange={switchTheme}
            color='secondary' />} label={themeText} />
        </FormGroup>
      </PurpleThemeProvider>
      <div className={classes.actions}>
        <Button onClick={onClose}>Fermer</Button>
      </div>
    </div>
  )
}

export default SettingsModal
