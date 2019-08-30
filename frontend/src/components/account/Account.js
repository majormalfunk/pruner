import React from 'react'
import { Container } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { RELOGIN, CREATE_ACCOUNT, LOGIN, UPDATE_NICKNAME, UPDATE_PASSWORD } from './gqls'

import AccountDetailsForm from './AccountDetailsForm'
import CreateAccount from './CreateAccount'
import Login from './Login'
import Relogin from './Relogin'


const Account = ({ show, user, handleSetUser, handleError, logout}) => {

  const relogin = useMutation(RELOGIN, {
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
        <Relogin relogin={relogin}
          handleSetUser={handleSetUser} handleError={handleError} />

        <Login login={login}
          handleSetUser={handleSetUser} handleError={handleError} />

        <Container>OR</Container>

        <CreateAccount createAccount={createAccount}
          handleSetUser={handleSetUser} handleError={handleError} />
      </Container>
    )
  }

}

export default Account