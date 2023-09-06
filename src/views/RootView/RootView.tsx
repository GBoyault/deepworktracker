import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsContext } from '../../contexts/SettingsContext'
import Header from '../../components/Layout/Header/Header'
import classes from './RootView.module.css'

const RootView = () => {
  const { theme } = useContext(SettingsContext)
  const className = theme === 'dark'
    ? classes.main
    : `${classes.main} ${classes['main--theme-light']}`

  return (
    <>
      <Header />
      <main className={className}>
        <Outlet />
      </main>
    </>
  )
}

export default RootView
