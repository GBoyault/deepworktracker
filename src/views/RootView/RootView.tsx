import { Outlet } from 'react-router-dom'
import Header from '../../components/Layout/Header/Header'
import classes from './RootView.module.css'

const RootView = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  )
}

export default RootView
