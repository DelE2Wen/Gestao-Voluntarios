import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styles from './SignUp.module.css'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const {loading, signup} = useSignup()
  const handleChange = (e)=>{
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async(e) =>{ 
      e.preventDefault()
      await signup(inputs)
    }

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h1>
          SignUp
          <span>PapoFlow</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Nome de usuário" name="name" value={inputs.name} onChange={handleChange}/>
          <Input type="email" placeholder="Insira seu email" name="email" value={inputs.email} onChange={handleChange}/>
          <Input type="text" placeholder="Insira seu telefone" name="phone" value={inputs.phone} onChange={handleChange}/>
          <Input type="password" placeholder="Insira sua senha" name="password" value={inputs.password} onChange={handleChange}/>
          <Input type="password" placeholder="Confirme sua senha" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange}/>
          
          <Link to="/login">Já possui uma conta?</Link>
         
          <Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Registrar'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignUp