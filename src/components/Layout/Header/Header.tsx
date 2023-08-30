import React from 'react'
import MainNavigation from '../MainNavigation/MainNavigation'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1><small>DeepWork</small>Tracker</h1>
      <MainNavigation />
    </header>
  )
}

export default Header
