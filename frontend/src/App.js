import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useQuery, useMutation, useSubscription, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import './App.css'
import { PAGE_HOME, PAGE_CREATE_ACCOUNT, PAGE_LOGIN } from './constants'

import CreateAccountForm from './components/CreateAccountForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!, $nickname: String!) {
    createAccount(username: $username, password: $password, nickname: $nickname) {
      value
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
const CURRENT_USER = gql`
{
  me {
    username
    favoriteGenre
    id
  }
}
`
const AVAILABLE_EVENTS = gql`
  {
    availableEvents {
      name
      description
      public
      recurrences {
        name
        public
        id
      }
      id
    }
  }
`
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
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage(PAGE_HOME)
  }

  const createAccount = useMutation(CREATE_ACCOUNT, {
    onError: handleError
  })
  const login = useMutation(LOGIN, {
    onError: handleError
  })
  //const userResult = useQuery(CURRENT_USER)
  const availableEvents = useQuery(AVAILABLE_EVENTS)

  return (
    <div className="App">
      <header className="App-header">

        <Container>
            <div>
              <div>
                <Navbar fixed="top" collapseOnSelect expand="md" className="App-menu" variant="dark">
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Navbar.Brand>Pruner</Navbar.Brand>
                    <Nav>
                      <button onClick={() => setPage(PAGE_HOME)}>Home</button>
                    </Nav>
                    <Nav>
                        {(!token ? <button onClick={() => setPage(PAGE_CREATE_ACCOUNT)}>Create Account</button> : null)}
                    </Nav>
                    <Nav>
                        {(!token ? <button onClick={() => setPage(PAGE_LOGIN)}>Login</button> : null)}
                    </Nav>
                    <Nav>
                        {(token ? <button onClick={() => logout()}>Logout</button> : null)}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
              <div>
              </div>
            </div>
        </Container>

      </header>
      <div className="App-body">
        <div>
          <button onClick={() => setPage(PAGE_HOME)}>Home</button>
        </div>

        <div>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>

        <CreateAccountForm createAccount={createAccount} setToken={(token) => setToken(token)}
          show={page === PAGE_CREATE_ACCOUNT} handleError={handleError} />

        <LoginForm login={login} setToken={(token) => setToken(token)}
          show={page === PAGE_LOGIN} handleError={handleError} />

        <Home result={availableEvents}
          show={page === PAGE_HOME} handleError={handleError}
        />

      </div>
    </div>
  )
}

export default App
