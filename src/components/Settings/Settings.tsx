import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Modal } from '../UI/'
import SettingsModal from './SettingsModal'
import { settings } from '../../utils/icons'
import classes from './Settings.module.css'

const Settings = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const showModalHandler = () => {
    setShowSettingsModal(true)
  }

  const hideModalHandler = () => {
    setShowSettingsModal(false)
  }

  return (
    <div className={classes.settings}>
      <button
        title='Paramètres'
        className={classes['settings-button']}
        onClick={showModalHandler}
      >
        {settings}
      </button>
      <AnimatePresence>
        {showSettingsModal && (
          <Modal onClose={hideModalHandler}>
            <SettingsModal onClose={hideModalHandler} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Settings
