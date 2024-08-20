import React from 'react'
import Message from './Message'
import styles from './Messages.module.css'

const Messages = () => {
  return (
    <div className={styles.container}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}

export default Messages