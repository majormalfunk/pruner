import React, { useState, useEffect } from 'react'
import { USERNAME_LENGTH, PASSWORD_LENGTH } from '../../constants'
import { ACTION_LOGIN } from '../../constants'
import LoginForm from './LoginForm'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const controlUsername = () => {
    if (document.getElementById(`usernamehintlogin`)) {
      if (username.trim() === '') {
        document.getElementById(`usernamehintlogin`).innerHTML = 'Enter username'
        return false
      } else if (username.trim().length < USERNAME_LENGTH) {
        document.getElementById(`usernamehintlogin`).innerHTML = 'Enter username'
        return false
      } else {
        document.getElementById(`usernamehintlogin`).innerHTML = 'Enter username'
        return true
      }
    }
  }
  const controlPassword = () => {
    if (document.getElementById(`passwordhintlogin`)) {
      if (password.trim() === '') {
        document.getElementById(`passwordhintlogin`).innerHTML = 'Enter password'
        return false
      } else if (password.trim().length < PASSWORD_LENGTH) {
        document.getElementById(`passwordhintlogin`).innerHTML = 'Enter password'
        return false
      } else {
        document.getElementById(`passwordhintlogin`).innerHTML = 'Enter password'
        return true
      }
    }
  }

  useEffect(() => {
    const usernameOk = controlUsername()
    const passwordOk = controlPassword()
    if (document.getElementById(ACTION_LOGIN)) {
      document.getElementById(ACTION_LOGIN).disabled = !(usernameOk && passwordOk)
    }
  })

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const clearFields = () => {
    setUsername('')
    document.getElementById(`setusernamelogin`).value = ''
    setPassword('')
    document.getElementById(`setpasswordlogin`).value = ''
  }

  const handleLoginCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      //console.log('Trying to login')
      const result = await props.login[0]({
        variables: { username, password }
      })
      if (result) {
        const loggedInAs = result.data.login
        clearFields()
        props.handleSetUser(loggedInAs)
        //console.log('Logged in as', loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      clearFields()
      props.handleError(error)
    }

  }

  return (
    <LoginForm
      username={username}
      handleUsername={handleUsername}
      password={password}
      handlePassword={handlePassword}
      handleLoginCancel={handleLoginCancel}
      handleLogin={handleLogin} />
  )
}

export default Login