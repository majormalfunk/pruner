import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { useQuery, useMutation, useSubscription, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import './App.css'
import { USER_TOKEN } from './constants'
import { PAGE_HOME, PAGE_ACCOUNT } from './constants'

import Home from './components/Home'
import Account from './components/account/Account'

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
  console.log('App: Token in storage was:', tokenFromStorage)
  if (tokenFromStorage && tokenFromStorage.length > 0) {
    if (!token || token !== tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage(PAGE_HOME)
  }

  return (
    <div className="App">
      <header className="App-header">

        <Container>
          <Navbar fixed="top" collapseOnSelect expand="md" className="App-menu" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Row>
                <Col className="Menu-brand">
                  <Navbar.Brand className="Menu-brand">Pruner</Navbar.Brand>
                </Col>
                <Col className="Menu-button">
                  <Nav>
                    <button className="Menu-button" onClick={() => setPage(PAGE_HOME)}>Home</button>
                  </Nav>
                </Col>
                <Col className="Menu-button" md="auto">
                  <Nav>
                    <button className="Menu-button" onClick={() => setPage(PAGE_ACCOUNT)}>{token ? 'My Account' : 'Login'}</button>
                  </Nav>
                </Col>
              </Row>
            </Navbar.Collapse>
          </Navbar>
        </Container>

      </header>
      <div className="App-body">

        <div>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>

        <Home show={page === PAGE_HOME} handleError={handleError} />

        <Account setToken={(token) => setToken(token)} token={token} logout={logout}
          show={page === PAGE_ACCOUNT} handleError={handleError} />

      </div>
    </div>
  )
}

export default App
