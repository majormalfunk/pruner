import React, { useState } from 'react'
import { USER_TOKEN } from '../constants'

const CreateAccountForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await props.createAccount[0]({
        variables: { username, password, nickname }
      })
      if (result) {
        const token = result.data.createAccount.value
        props.setToken(token)
        localStorage.setItem(USER_TOKEN, token)
        setUsername('')
        setPassword('')
        setNickname('')
        props.backToPage(props.backPage)
      }
    } catch (error) {
      console.log(error.message)
      setUsername('')
      setPassword('')
      setNickname('')
      props.handleError(error)
    }

  }

  return (
    <div>
      <div>
        &nbsp;
      </div>
      <div>
        Enter username and password to create an account
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
          Nickname <input
            value={nickname}
            onChange={({ target }) => setNickname(target.value)}
          />
        </div>
        <div>
          &nbsp;
        </div>
        <button type='submit'>Create account</button>
      </form>
    </div>
  )
}

export default CreateAccountForm