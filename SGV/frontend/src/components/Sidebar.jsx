import React from 'react'
import Search from './Search'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import MessageContainer from './MessageContainer'
import styles from './Siderbar.module.css'


const Sidebar = () => {
  return (
    <div className={styles.container}>
      <Search />
      <Conversations/>
      <LogoutButton/>
    </div>
  )
}

export default Sidebar