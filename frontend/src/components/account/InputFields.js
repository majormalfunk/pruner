import React from 'react'
import { Form } from 'react-bootstrap'

export const UsernameField = (props) => {
  return (
    <>
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" required placeholder="Username" name="usernameField" id={props.setusername}
        defaultValue={props.username} onChange={props.trigger} disabled={props.disabled} />
      <Form.Text className="text-muted" id={props.usernamehint}></Form.Text>
    </>
  )
}

export const PasswordField = (props) => {
  return (
    <>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="passwordField" id={props.setpassword}
        defaultValue={props.password} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.passwordhint}></Form.Text>
    </>
  )
}

export const VeripassField = (props) => {
  return (
    <>
      <Form.Label>Verify password</Form.Label>
      <Form.Control type="password" placeholder="Password again" name="veripassField" id={props.setveripass}
        defaultValue={props.veripass} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.veripasshint}></Form.Text>
    </>
  )
}

export const NicknameField = (props) => {
  return (
    <>
      <Form.Label>Nickname</Form.Label>
      <Form.Control type="text" placeholder="Nickname" name="nicknameField" id={props.setnickname}
        defaultValue={props.nickname} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.nicknamehint}></Form.Text>
    </>
  )
}

export const EmailField = (props) => {
  return (
    <>
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="user@domain.dom" name="emailField"
        defaultValue={props.email} onChange={props.trigger} />
      <Form.Text className="text-muted">Enter your email address</Form.Text>
    </>
  )
}

