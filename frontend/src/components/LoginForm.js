import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { USER_TOKEN } from '../constants'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //if (!props.show) {
  //  return null
  //}

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await props.login[0]({
        variables: { username, password }
      })
      if (result) {
        const token = result.data.login.token
        localStorage.setItem(USER_TOKEN, token)
        const loggedInAs = result.data.login
        setUsername('')
        setPassword('')
        props.setToken(token)
        props.setUser(loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      setUsername('')
      setPassword('')
      props.handleError(error)
    }

  }

  return (

    <Container>
      <form onSubmit={submit}>
        <Row>
          <Col className="Component-title">
            Enter username and password to log in
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You need to login only if you want to create and manage your own public or private events
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-input-prompt">Username</Col>
          <Col>
            <input value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </Col>
        </Row>
        <Row>
          <Col className="Component-input-prompt">Password</Col>
          <Col>
            <input type='password' value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </Col>
        </Row>
        <Row>
          <Col><button type='submit'>Login</button></Col>
        </Row>
      </form>
    </Container>

  )
}

export default LoginForm