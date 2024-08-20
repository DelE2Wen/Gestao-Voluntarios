import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.css'

const UserLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}

export default UserLayout