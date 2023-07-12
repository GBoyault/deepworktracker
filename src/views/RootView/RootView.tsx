import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header/Header";
import styles from './RootView.module.css';

const RootView = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default RootView;