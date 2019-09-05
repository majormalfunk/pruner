import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'
import { setOwnEvents } from '../../reducers/ownEventsReducer'

import { NOTIF_SUCCESS, NOTIF_WARNING } from '../../constants'

import { USERNAME_LENGTH, PASSWORD_LENGTH } from '../../constants'
import { ACTION_LOGIN } from '../../constants'
import { USER_TOKEN } from '../../constants'
import LoginForm from './LoginForm'

const Login = (props) => {

  const { setNotification, login, getOwnEvents, handleSetUser, setOwnEvents } = props

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
      const result = await login[0]({
        variables: { username, password }
      })
      if (result) {
        let loggedInAs = result.data.login
        // We need to set token to lacal storage before executing search for own events
        // Otherwise it's not in the request. Maybe move it to redux store?
        window.localStorage.setItem(USER_TOKEN, loggedInAs.token)
        const username = loggedInAs.username
        loggedInAs.events = []
        try {
          //console.log('Own events for', username)
          const eventsResult = await getOwnEvents[0]({
            variables: { username }
          })
          //console.log('Data:', eventsResult.data)
          if (eventsResult.data) {
            //console.log('Got something from own events')
            console.log(eventsResult.data.getOwnEvents)
            loggedInAs.events = eventsResult.data.getOwnEvents
            setOwnEvents(eventsResult.data.getOwnEvents)
          }
        } catch (error) {
          console.log('Couldnt get own events in login', error.message)
          setNotification('Something went wrong fetching your own events', NOTIF_WARNING, 5)
        }
        clearFields()
        handleSetUser(loggedInAs)
        setNotification(`Logged in as ${loggedInAs.username}`, NOTIF_SUCCESS, 5)
        //console.log('Logged in as', loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      clearFields()
      setNotification(error.message, NOTIF_WARNING, 5)
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification,
  setOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)