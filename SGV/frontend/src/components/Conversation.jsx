import React from 'react'
import { RxAvatar } from "react-icons/rx";
import styles from './Conversation.module.css'
import useConversation from '../zustand/useConversation'

const Conversation = ({conversation, index}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()
  return (
    <>
      <div className={styles.container}>
        <div className = {styles.avatar}>
          <RxAvatar/>
        </div>
        <div className={styles.containerName}>
          <div className={styles.containerInfo}>
            <p>{conversation.name}</p>
            <span>O</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Conversation