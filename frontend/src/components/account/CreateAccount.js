import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayError } from '../../reducers/notificationReducer'
import { setCurrentUser } from '../../reducers/userReducer'

import { USER_TOKEN } from '../../constants'
import { USERNAME_LENGTH, PASSWORD_LENGTH, NICKNAME_LENGTH } from '../../constants'
import { ACTION_CREATE_ACCOUNT } from '../../constants'
import CreateAccountForm from './CreateAccountForm'

const CreateAccount = (props) => {

  const { displaySuccess, displayError, setCurrentUser, createAccount } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [veripass, setVeripass] = useState('')
  const [nickname, setNickname] = useState('')

  const controlUsername = () => {
    if (document.getElementById(`usernamehintcreate`)) {
      if (username.trim() === '') {
        document.getElementById(`usernamehintcreate`).innerHTML = 'Enter username'
        return false
      } else if (username.trim().length < USERNAME_LENGTH) {
        document.getElementById(`usernamehintcreate`).innerHTML = `Username must be at least ${USERNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`usernamehintcreate`).innerHTML = 'Username is long enough'
        return true
      }
    }
  }
  const controlPassword = () => {
    if (document.getElementById(`passwordhintcreate`) && document.getElementById(`veripasshintcreate`)) {
      if (password.trim() === '' && veripass.trim() === '') {
        document.getElementById(`passwordhintcreate`).innerHTML = 'Enter password'
        document.getElementById(`veripasshintcreate`).innerHTML = 'Enter password again'
        return false
      } else {
        if (password !== veripass) {
          document.getElementById(`passwordhintcreate`).innerHTML = 'Passwords do not match'
          document.getElementById(`veripasshintcreate`).innerHTML = 'Passwords do not match'
          return false
        } else if (password.trim().length < PASSWORD_LENGTH) {
          document.getElementById(`passwordhintcreate`).innerHTML = `Password must be at least ${PASSWORD_LENGTH} characters`
          document.getElementById(`veripasshintcreate`).innerHTML = `Password must be at least ${PASSWORD_LENGTH} characters`
          return false
        } else {
          document.getElementById(`passwordhintcreate`).innerHTML = 'Passwords are matching'
          document.getElementById(`veripasshintcreate`).innerHTML = 'Passwords are matching'
          return true
        }
      }
    }
  }
  const controlNickname = () => {
    if (document.getElementById(`nicknamehintcreate`)) {
      if (nickname.trim() === '') {
        document.getElementById(`nicknamehintcreate`).innerHTML = 'Enter nickname shown to other users'
        return false
      } else if (nickname.trim().length < NICKNAME_LENGTH) {
        document.getElementById(`nicknamehintcreate`).innerHTML = `Nickname must be at least ${NICKNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`nicknamehintcreate`).innerHTML = 'Nickname is long enough'
        return true
      }
    }
  }

  useEffect(() => {
    const usernameOk = controlUsername()
    const passwordOk = controlPassword()
    const nicknameOk = controlNickname()
    if (document.getElementById(ACTION_CREATE_ACCOUNT)) {
      document.getElementById(ACTION_CREATE_ACCOUNT).disabled = !(usernameOk && passwordOk && nicknameOk)
    }
  })

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleVeripass = (event) => {
    setVeripass(event.target.value)
  }
  const handleNickname = (event) => {
    setNickname(event.target.value)
  }

  const clearFields = () => {
    setUsername('')
    document.getElementById(`setusernamecreate`).value = ''
    setPassword('')
    document.getElementById(`setpasswordcreate`).value = ''
    setVeripass('')
    document.getElementById(`setveripasscreate`).value = ''
    setNickname('')
    document.getElementById(`setnicknamecreate`).value = ''
  }

  const handleCreateAccountCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateAccount = async (event) => {
    event.preventDefault()

    if (password === veripass && password.length >= PASSWORD_LENGTH) {
      if (username.trim().length >= USERNAME_LENGTH && nickname.trim().length >= NICKNAME_LENGTH) {
        try {
          //console.log('Next createAccount!')
          const result = await createAccount[0]({
            variables: { username, password, nickname }
          })
          //console.log('Past the call')
          if (result) {
            let loggedInAs = result.data.createAccount
            clearFields()
            window.localStorage.setItem(USER_TOKEN, loggedInAs.token)
            setCurrentUser(loggedInAs)
            displaySuccess(`Account created for ${loggedInAs.nickname}`)
            return null
          }
        } catch (error) {
          console.log(error.message)
          clearFields()
          displayError(error)
        }
      } else {
        displayError('Username or nickname does not comply')
        console.log('Username or nickname does not comply')
      }
    } else {
      displayError('Password does not comply')
      console.log('Password does not comply')
    }

  }

  return (
    <CreateAccountForm
      username={username}
      handleUsername={handleUsername}
      password={password}
      handlePassword={handlePassword}
      veripass={veripass}
      handleVeripass={handleVeripass}
      nickname={nickname}
      handleNickname={handleNickname}
      handleCreateAccountCancel={handleCreateAccountCancel}
      handleCreateAccount={handleCreateAccount} />
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayError,
  setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)