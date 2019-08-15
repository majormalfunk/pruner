import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import AccountDetailsForm from './AccountDetailsForm'
import CreateAccount from './CreateAccount'
import Login from './Login'

const RELOGIN = gql`
  {
    relogin {
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
const UPDATE_NICKNAME = gql`
  mutation updateNickname($username: String!, $nickname: String!) {
    updateNickname(username: $username, nickname: $nickname) {
      username
      nickname
      token
    }
  }
`

const Account = (props) => {
  const [user, setUser] = useState(null)

  const relogin = useQuery(RELOGIN, {
    onError: props.handleError
  })
  const createAccount = useMutation(CREATE_ACCOUNT, {
    onError: props.handleError
  })
  const login = useMutation(LOGIN, {
    onError: props.handleError
  })
  const updateNickname = useMutation(UPDATE_NICKNAME, {
    onError: props.handleError
  })

  const logout = () => {
    setUser(null)
    props.logout()
  }

  const tryToRelogin = async () => {
    try {
      const result = await relogin
      if (result.data) {
        const token = result.data.relogin.token
        const loggedInAs = result.data.relogin
        setUser(loggedInAs)
        props.handleSetToken(token)
        console.log('We have a token and user was resolved')
      }
    } catch (error) {
      console.log(error.message)
      props.handleError(error)
      throw new Error(error)
    }
  }

  const tokenFromProps = props.token

  if (tokenFromProps && !user) {
    tryToRelogin()
  }

  if (!props.show) {
    return null
  }

  if (user) {

    console.log('Rendering Account when there is a user')

    return (
      <div>
        <AccountDetailsForm user={user} updateNickname={updateNickname} logout={logout}
          setUser={(user) => setUser(user)} handleError={props.handleError} />
      </div>
    )

  } else {

    console.log('Rendering Account when there is no token or token is not yet resolved')

    return (
      <Container>
        <Login login={login} handleSetToken={props.handleSetToken}
          setUser={setUser} handleError={props.handleError} />

        <Container>OR</Container>

        <CreateAccount createAccount={createAccount} handleSetToken={props.handleSetToken}
          setUser={setUser} handleError={props.handleError} />
      </Container>
    )
  }

}

export default Account