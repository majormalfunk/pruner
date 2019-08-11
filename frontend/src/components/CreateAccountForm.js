import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { USER_TOKEN } from '../constants'

const CreateAccountForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [veripass, setVeripass] = useState('')
  const [nickname, setNickname] = useState('')

  //if (!props.show) {
  //  return null
  //}

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await props.createAccount[0]({
        variables: { username, password, nickname }
      })
      if (result) {
        const token = result.data.createAccount.value
        localStorage.setItem(USER_TOKEN, token)
        const loggedInAs = username
        setUsername('')
        setPassword('')
        setVeripass('')
        setNickname('')
        props.setToken(token)
        props.setUser(loggedInAs)
        return null
      }
    } catch (error) {
      console.log(error.message)
      setUsername('')
      setPassword('')
      setVeripass('')
      setNickname('')
      props.handleError(error)
    }

  }

  return (
    <Container>
      <form onSubmit={submit}>
        <Row>
          <Col className="Component-title">
            Enter username and password to create an account
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You need an account only if you want to create and manage your own public or private events
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
          <Col className="Component-input-prompt">Verify password</Col>
          <Col>
            <input type='password' value={veripass}
              onChange={({ target }) => setVeripass(target.value)} />
          </Col>
        </Row>
        <Row>
          <Col className="Component-input-prompt">Nickname</Col>
          <Col>
            <input value={nickname}
              onChange={({ target }) => setNickname(target.value)} />
          </Col>
        </Row>
        <Row>
          <Col><button type='submit'>Create account</button></Col>
        </Row>
      </form>
    </Container>
  )
}

export default CreateAccountForm