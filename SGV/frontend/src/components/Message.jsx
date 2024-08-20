import React from 'react'
import { RxAvatar } from "react-icons/rx";
import styles from './Message.module.css'

const Message = () => {
  return (
  <div className={styles.chat}>
    <div className={styles.chatContent}>
        < RxAvatar className={styles.chatAvatar}/>
      <div className={styles.messageStyle}>
       Mensagem
      </div>
    </div>
    <div className={styles.chatFooter}>
      12:20
    </div>
  </div>
  )
}

export default Message