import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useApolloClient } from 'react-apollo-hooks'
import './App.css'

import { USER_TOKEN } from './constants'
import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT } from './constants'

import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { NOTIF_INFO, NOTIF_WARNING } from './constants'

import Home from './components/home/Home'
import Account from './components/account/Account'
import Event from './components/event/Event'

//const AVAILABLE_EVENTS = gql`
//  {
//    availableEvents {
//      name
//      description
//      public
//      recurrences {
//        name
//        public
//        id
//      }
//      id
//    }
//  }
//`

const App = (props) => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(PAGE_HOME)
  //const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const handleError = (error) => {
    //setErrorMessage(error.message.replace('GraphQL error:', ''))
    const message = error.message.replace('GraphQL error:', '')
    props.setNotification(message, NOTIF_WARNING, 5)
    //setTimeout(() => {
    //  setErrorMessage(null)
    //}, 5000)
  }

  const handleSetUser = (newUser) => {
    if (newUser) {
      setUser(newUser)
      window.localStorage.setItem(USER_TOKEN, newUser.token)
    } else {
      setUser(null)
      window.localStorage.removeItem(USER_TOKEN)
    }
  }

  const handleSetPage = (event) => {
    //console.log('Got event in handleSetPage', event)
    //event.preventDefault()
    //setPage(event.target.value)
    setPage(event)
    //console.log('Page was set to', event)
  }

  const logout = () => {
  //  setToken(null)
    setUser(null)
    window.localStorage.clear()
    client.resetStore()
    setPage(PAGE_HOME)
    props.setNotification('Logged out', NOTIF_INFO, 5)
  }

  return (
    <div className="App">
      <header className="App-header">

        <Container>
          <Navbar fixed="top" className="App-menu" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Brand className="Menu-brand">Pruner</Navbar.Brand>
              <Nav>
                <button className="Menu-button" onClick={() => setPage(PAGE_HOME)}>Home</button>
              </Nav>
              <Nav>
                <button className="Menu-button" onClick={() => setPage(PAGE_ACCOUNT)}>{user ? 'My Account' : 'Login'}</button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>

      </header>
      <div className="App-body">

        <Notification />

        <Home show={page === PAGE_HOME}
          handleSetPage={handleSetPage}
          handleError={handleError} />

        <Account show={page === PAGE_ACCOUNT}
          logout={logout}
          user={user} handleSetUser={handleSetUser}
          handleError={handleError} />

        <Event show={page.startsWith(PAGE_EVENT)} page={page}
          user={user} handleSetUser={handleSetUser}
          handleError={handleError} />

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)