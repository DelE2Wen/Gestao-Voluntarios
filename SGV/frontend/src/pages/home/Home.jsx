import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'
import styles from './HomeContainer.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Sidebar/>
      <MessageContainer />
    </div>
  )
}

export default Home