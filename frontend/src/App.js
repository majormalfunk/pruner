import React, { useState } from 'react'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { useApolloClient } from 'react-apollo-hooks'
import './App.css'
import { USER_TOKEN } from './constants'
import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT } from './constants'

import Notification from './components/Notification'
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

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState(PAGE_HOME)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.message.replace('GraphQL error:', ''))
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const tokenFromStorage = window.localStorage.getItem(USER_TOKEN)
  //console.log('App: Token in storage was:', tokenFromStorage)
  if (tokenFromStorage && tokenFromStorage.length > 0) {
    if (!token || token !== tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }

  const handleSetToken = (newToken) => {
    //console.log('App: handleSetToken to:', newToken)
    if (newToken) {
      window.localStorage.setItem(USER_TOKEN, newToken)
      setToken(newToken)
      //console.log('A new user token was set')
    } else {
      window.localStorage.removeItem(USER_TOKEN)
      setToken(null)
      //console.log('User token was cleared')
    }
  }

  const handleSetPage = (event) => {
    console.log('Got event in handleSetPage', event)
    //event.preventDefault()
    //setPage(event.target.value)
    setPage(event)
    console.log('Page was set to', event)
  }

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    setPage(PAGE_HOME)
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
                <button className="Menu-button" onClick={() => setPage(PAGE_ACCOUNT)}>{token ? 'My Account' : 'Login'}</button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>

      </header>
      <div className="App-body">

        <Notification message={errorMessage} />

        <Home show={page === PAGE_HOME} handleSetPage={handleSetPage} handleError={handleError} />

        <Account handleSetToken={handleSetToken} token={token} logout={logout}
          show={page === PAGE_ACCOUNT} handleError={handleError} />

        <Event token={token} show={page.startsWith(PAGE_EVENT)} page={page} handleError={handleError} />

      </div>
    </div>
  )
}

export default App
