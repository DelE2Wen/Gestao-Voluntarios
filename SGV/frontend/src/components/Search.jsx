import React from 'react'
import { FaSearch } from "react-icons/fa"
import styles from './Search.module.css'

const Search = () => {
  return (
    <form className={styles.search}>
      <input className={styles.input} type="text" placeholder="Buscar" />
      <button className={styles.button} aria-label="Buscar"><FaSearch /></button>
    </form>
  )
}

export default Search