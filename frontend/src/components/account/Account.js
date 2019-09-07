import React from 'react'
import { connect } from 'react-redux'

import { displayError } from '../../reducers/notificationReducer'

import { Container } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { RELOGIN, CREATE_ACCOUNT, LOGIN, UPDATE_NICKNAME, UPDATE_PASSWORD } from './gqls'
import { GET_OWN_EVENTS } from '../event/gqls'

import AccountDetailsForm from './AccountDetailsForm'
import CreateAccount from './CreateAccount'
import Login from './Login'
import Relogin from './Relogin'


const Account = (props) => {

  const { displayError, show, user, handleSetUser, logout} = props

  const handleError = (error) => {
    displayError(error)
  }

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
  const getOwnEvents = useMutation(GET_OWN_EVENTS, {
    onError: handleError,
    options: { fetchPolicy: 'network-only' }
  })

  if (!show) {
    return null
  }

  if (user) {

    //console.log('Rendering Account when there is a user')

    return (
      <div>
        <AccountDetailsForm user={user} updateNickname={updateNickname} updatePassword={updatePassword}
          logout={logout} handleSetUser={handleSetUser} />
      </div>
    )

  } else {

    //console.log('Rendering Account when there is no user')

    return (
      <Container>
        <Relogin relogin={relogin} getOwnEvents={getOwnEvents}
          handleSetUser={handleSetUser} />

        <Login login={login} getOwnEvents={getOwnEvents}
          handleSetUser={handleSetUser} />

        <Container>OR</Container>

        <CreateAccount createAccount={createAccount} handleSetUser={handleSetUser} />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)