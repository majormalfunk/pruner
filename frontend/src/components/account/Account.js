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

  const { displayError, currentUser, show, logout} = props

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

  if (currentUser && currentUser !== null) {

    //console.log('Rendering Account when there is a user')

    return (
      <div>
        <AccountDetailsForm updateNickname={updateNickname} updatePassword={updatePassword} logout={logout} />
      </div>
    )

  } else {

    //console.log('Rendering Account when there is no user')

    return (
      <Container>
        <Relogin relogin={relogin} getOwnEvents={getOwnEvents} />

        <Login login={login} getOwnEvents={getOwnEvents} />

        <Container>OR</Container>

        <CreateAccount createAccount={createAccount} />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    ownEvents: state.ownEvents
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)