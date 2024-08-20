import React from 'react'
import { LuSendHorizonal } from "react-icons/lu";
import styles from './MessageInput.module.css'

const MessageInput = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.input} type = "text" placeholder="Enviar mensagem" name="sendMessage"/>
        <button className={styles.button} type="submit"><LuSendHorizonal /></button>
      </form>
    </div>
  )
}

export default MessageInput