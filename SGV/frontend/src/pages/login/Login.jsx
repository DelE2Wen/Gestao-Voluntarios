import React from 'react'
import styles from './Login.module.css'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  })

  const { loading, login } = useLogin()

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const success = await login(inputs)
    if(!success){
      setInputs({
        email: '',
        password: '',
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h1>
          Login
          <span>PapoFlow</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Insira seu email" 
            name="email" 
            value={inputs.email} 
            onChange={handleChange}
          />
          <Input 
            type="password" 
            placeholder="Insira sua senha" 
            name="password" 
            value={inputs.password} 
            onChange={handleChange}
          />
          
          <Link to='/cadastrar'>Já possui uma conta?</Link>
          
          <Button type="submit" disabled={loading}>{loading ? "Carregando..." : "Entrar"}</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
