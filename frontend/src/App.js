import React from 'react'
import { connect } from 'react-redux'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useApolloClient } from 'react-apollo-hooks'
import './App.css'

import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT_CREATE, PAGE_PLAN_CREATE, PAGE_NOT_IMPLEMENTED } from './constants'

import Notification from './components/Notification'
import { displayInfo } from './reducers/notificationReducer'
import { clearCurrentUser } from './reducers/userReducer'
import { setPageHome, setPageAccount, setPageEventCreate } from './reducers/pageReducer'
import { clearOwnEvents } from './reducers/ownEventsReducer'

import Home from './components/home/Home'
import Account from './components/account/Account'
import Event from './components/event/event/Event'
import Plan from './components/plan/Plan'
import NotImplemented from './components/home/NotImplemented'

const App = (props) => {

  const { displayInfo, currentUser, clearCurrentUser, currentPage, clearOwnEvents,
          setPageHome, setPageAccount } = props

  const client = useApolloClient()

  const logout = () => {
    clearOwnEvents()
    clearCurrentUser()
    window.localStorage.clear()
    client.resetStore()
    setPageHome()
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
                <button className="Menu-button" onClick={() => setPageHome()}>Home</button>
              </Nav>
              <Nav>
                <button className="Menu-button" onClick={() => setPageAccount()}>
                  {currentUser ? 'My Account' : 'Login'}
                </button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>

      </header>
      <div className="App-body">

        <Notification />

        {( currentPage === PAGE_HOME && <Home /> )}
        {( currentPage === PAGE_ACCOUNT && <Account logout={logout} />)}
        {( currentPage === PAGE_EVENT_CREATE && <Event /> )}
        {( currentPage === PAGE_PLAN_CREATE && <Plan /> )}
        {( currentPage === PAGE_NOT_IMPLEMENTED && <NotImplemented /> )}

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = {
  displayInfo,
  clearCurrentUser,
  setPageHome,
  setPageAccount,
  setPageEventCreate,
  clearOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(App)