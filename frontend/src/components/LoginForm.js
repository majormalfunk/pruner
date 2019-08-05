import React, { useState } from 'react'
import { USER_TOKEN } from '../constants'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await props.login[0]({
        variables: { username, password }
      })

      if (result) {
        const token = result.data.login.value
        props.setToken(token)
        localStorage.setItem(USER_TOKEN, token)
        setUsername('')
        setPassword('')
        props.backToPage(props.backPage)
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

export default LoginForm