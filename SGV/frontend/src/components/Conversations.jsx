import React from 'react'
import Conversation from './Conversation'
import styles from './Conversations.module.css'
import useGetConversations from '../hooks/useGetConversations'

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  console.log(conversations)
  return (
    <div className={styles.container}>
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
        />
      ))}
      {loading ? <span>Carregando...</span>: null}
    </div>
  )
}

export default Conversations