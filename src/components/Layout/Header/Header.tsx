import React from 'react'
import MainNavigation from '../MainNavigation/MainNavigation'
import Settings from '../../Settings/Settings'

import classes from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <h1><small>DeepWork</small>Tracker</h1>
      <MainNavigation />
      <Settings />
    </header>
  )
}

export default Header
