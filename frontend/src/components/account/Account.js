import React from 'react'
import { Container } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-apollo-hooks'

import { RELOGIN, CREATE_ACCOUNT, LOGIN, UPDATE_NICKNAME, UPDATE_PASSWORD } from './gqls'

import AccountDetailsForm from './AccountDetailsForm'
import CreateAccount from './CreateAccount'
import Login from './Login'


const Account = ({ show, user, token, handleSetUser, handleSetToken, handleError, logout}) => {

  const relogin = useQuery(RELOGIN, {
    onError: handleError
  })
  const createAccount = useMutation(CREATE_ACCOUNT, {
    onError: handleError
  })
  const login = useMutation(LOGIN, {
    onError: handleError
  })
  const updateNickname = useMutation(UPDATE_NICKNAME, {
    onError: handleError
  })
  const updatePassword = useMutation(UPDATE_PASSWORD, {
    onError: handleError
  })

  // const logout = () => {
  //   setUser(null)
  //   props.logout()
  // }

  const tryToRelogin = async () => {
    try {
      const result = await relogin
      if (result.data) {
        const token = result.data.relogin.token
        const loggedInAs = result.data.relogin
        handleSetUser(loggedInAs)
        //console.log('Logged in as', loggedInAs)
        handleSetToken(token)
        //console.log('We have a token and user was resolved')
      }
    } catch (error) {
      console.log(error.message)
      handleError(error)
      throw new Error(error)
    }
  }

  if (token && !user) {
    //tryToRelogin()
  }

  if (!show) {
    return null
  }

  if (user) {

    //console.log('Rendering Account when there is a user')

    return (
      <div>
        <AccountDetailsForm user={user} updateNickname={updateNickname} updatePassword={updatePassword}
          logout={logout} handleSetUser={handleSetUser} handleError={handleError} />
      </div>
    )

  } else {

    //console.log('Rendering Account when there is no token or token is not yet resolved')

    return (
      <Container>
        <Login login={login} handleSetToken={handleSetToken}
          handleSetUser={handleSetUser} handleError={handleError} />

        <Container>OR</Container>

        <CreateAccount createAccount={createAccount} handleSetToken={handleSetToken}
          handleSetUser={handleSetUser} handleError={handleError} />
      </Container>
    )
  }

}

export default Account