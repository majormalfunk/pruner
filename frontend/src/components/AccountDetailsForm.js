import React, { useState } from 'react'
import { USER_TOKEN } from '../constants'

const AccountDetailsForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //if (!props.show) {
  //  return null
  //}

  const submit = async (event) => {
    event.preventDefault()

    try {
       const result = await props.login[0]({
        variables: { username, password }
      })
      if (result) {
        const token = result.data.login.token
        localStorage.setItem(USER_TOKEN, JSON.stringify(token))
        const loggedInAs = result.data.login.username
        setUsername('')
        setPassword('')
        props.setToken(token)
        props.setUser(loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      setUsername('')
      setPassword('')
      props.handleError(error)
    }

  }

  return (
    <div>
      <div>
        &nbsp;
      </div>
      <div>
        Enter username and password to log in
      </div>
      <div>
        &nbsp;
      </div>
      <form onSubmit={submit}>
        <div>
          Username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          &nbsp;
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default AccountDetailsForm