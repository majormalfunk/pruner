import React, { useState } from 'react'

import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

//import AccountDetailsForm from './AccountDetailsForm'
import CreateAccountForm from './CreateAccountForm'
import LoginForm from './LoginForm'

const RELOGIN = gql`
  mutation relogin($token: String!) {
    relogin(token: $token) {
      username
      nickname
      token
    }
  }
`
const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!, $nickname: String!) {
    createAccount(username: $username, password: $password, nickname: $nickname) {
      username
      nickname
      token
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      nickname
      token
    }
  }
`
const Account = (props) => {
  const [user, setUser] = useState(null)

  const relogin = useMutation(RELOGIN, {
    onError: props.handleError
  })
  const createAccount = useMutation(CREATE_ACCOUNT, {
    onError: props.handleError
  })
  const login = useMutation(LOGIN, {
    onError: props.handleError
  })

  let tokenFromProps = props.token

  const tryToRelogin = async () => {
    console.log('Trying to relogin with', tokenFromProps)
    try {
      const result = await relogin[0]({
        variables: { tokenFromProps }
      })
      console.log('Tried to get a result')
      if (result) {
        console.log('Relogin result:', result)
        const loggedInAs = result.data.relogin
        props.setUser(loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      props.handleError(error)
    }
  }

  if (props.token && !user) {
    console.log('We have a token, but no user is resolved')
    //tryToRelogin()
  }

  if (!props.show) {
    return null
  }

  if (user) {

    console.log('Rendering Account when there is a user')

    return (
      <div>
        <span>Hello {user.nickname}!</span>
      </div>
    )

  } else {

    console.log('Rendering Account when there is no token or token is not yet resolved')

    return (
      <div>
        <LoginForm login={login} setToken={(token) => props.setToken(token)}
          setUser={(user) => setUser(user)} handleError={props.handleError} />

        OR

        <CreateAccountForm createAccount={createAccount} setToken={(token) => props.setToken(token)}
          setUser={(user) => setUser(user)} handleError={props.handleError} />
      </div>
    )
  }

}

export default Account