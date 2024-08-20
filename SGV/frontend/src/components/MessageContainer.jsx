import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import styles from './MessageContainer.module.css'

const MessageContainer = () => {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.span}>Para:</span>
        <span className={styles.name}>Alguém</span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  )
}

export default MessageContainer