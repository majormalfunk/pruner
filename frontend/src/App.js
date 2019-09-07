import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useApolloClient } from 'react-apollo-hooks'
import './App.css'

import { USER_TOKEN } from './constants'
import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT } from './constants'

import Notification from './components/Notification'
import { displayInfo } from './reducers/notificationReducer'
import { clearOwnEvents } from './reducers/ownEventsReducer'

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

  const { displayInfo, clearOwnEvents } = props

  const [user, setUser] = useState(null)
  const [page, setPage] = useState(PAGE_HOME)
  const client = useApolloClient()

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
    setPage(event)
  }

  const logout = () => {
    clearOwnEvents()
    setUser(null)
    window.localStorage.clear()
    client.resetStore()
    setPage(PAGE_HOME)
    displayInfo('Logged out')
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

        <Home show={page === PAGE_HOME} handleSetPage={handleSetPage} />

        <Account show={page === PAGE_ACCOUNT} logout={logout}
          user={user} handleSetUser={handleSetUser} />

        <Event show={page.startsWith(PAGE_EVENT)} page={page}
          user={user} handleSetUser={handleSetUser} />

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  displayInfo,
  clearOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(App)