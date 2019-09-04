import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { setNotification } from '../../reducers/notificationReducer'
import { NOTIF_SUCCESS, NOTIF_WARNING } from '../../constants'

import { PASSWORD_LENGTH, NICKNAME_LENGTH, ACTION_CHANGE_PASSWORD_CANCEL } from '../../constants'
import { NicknameField, PasswordField, VeripassField } from './InputFields'
import { ACTION_LOGOUT, ACTION_CHANGE_NICKNAME, ACTION_CHANGE_PASSWORD } from '../../constants'
//import '../App.css'

const AccountDetailsForm = (props) => {

  const { setNotification, user, updateNickname, updatePassword, logout, handleSetUser } = props

  const [username, setUsername] = useState(user.username)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newVeripass, setNewVeripass] = useState('')
  const [nickname, setNickname] = useState(user.nickname)

  const controlNickname = () => {
    if (document.getElementById(`nicknamehintchange`) && nickname) {
      if (nickname.trim() === '') {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname shown to other users'
        return false
      } else if (nickname.trim().length < NICKNAME_LENGTH) {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname must be at least 6 characters'
        return false
      } else {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname is long enough'
        return true
      }
    }
  }

  const controlOldPassword = () => {
    if (document.getElementById(`passwordhintold`)) {
      if (oldPassword.trim() === '') {
        document.getElementById(`passwordhintold`).innerHTML = 'Enter old password'
        return false
      } else if (oldPassword.trim().length < PASSWORD_LENGTH) {
        document.getElementById(`passwordhintold`).innerHTML = 'Enter old password'
        return false
      } else {
        document.getElementById(`passwordhintold`).innerHTML = 'Enter old password'
        return true
      }
    }
  }
  const controlNewPassword = () => {
    if (document.getElementById(`passwordhintchange`) && document.getElementById(`veripasshintchange`)) {
      if (newPassword.trim() === '' && newVeripass.trim() === '') {
        document.getElementById(`passwordhintchange`).innerHTML = 'Enter new password'
        document.getElementById(`veripasshintchange`).innerHTML = 'Enter new password again'
        return false
      } else {
        if (newPassword !== newVeripass) {
          document.getElementById(`passwordhintchange`).innerHTML = 'Passwords do not match'
          document.getElementById(`veripasshintchange`).innerHTML = 'Passwords do not match'
          return false
        } else if (newPassword.trim().length < PASSWORD_LENGTH) {
          document.getElementById(`passwordhintchange`).innerHTML = `Password must be at least ${PASSWORD_LENGTH} characters`
          document.getElementById(`veripasshintchange`).innerHTML = `Password must be at least ${PASSWORD_LENGTH} characters`
          return false
        } else {
          document.getElementById(`passwordhintchange`).innerHTML = 'Passwords are matching'
          document.getElementById(`veripasshintchange`).innerHTML = 'Passwords are matching'
          return true
        }
      }
    }
  }


  useEffect(() => {
    const nicknameOk = controlNickname()
    if (document.getElementById(ACTION_CHANGE_NICKNAME)) {
      document.getElementById(ACTION_CHANGE_NICKNAME).disabled = !(nicknameOk)
    }
    const oldPasswordOk = controlOldPassword()
    const newPasswordOk = controlNewPassword()
    if (document.getElementById(ACTION_CHANGE_PASSWORD)) {
      document.getElementById(ACTION_CHANGE_PASSWORD).disabled = !(oldPasswordOk && newPasswordOk)
    }
  })

  const handleNickname = (event) => {
    setNickname(event.target.value)
  }
  const handleOldPassword = (event) => {
    setOldPassword(event.target.value)
  }
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value)
  }
  const handleNewVeripass = (event) => {
    setNewVeripass(event.target.value)
  }

  const handleChangeNickname = async (event) => {
    event.preventDefault()

    try {
      const result = await updateNickname[0]({
        variables: { username, nickname }
      })
      if (result) {
        //const token = result.data.updateNickname.token
        //localStorage.setItem(USER_TOKEN, token)
        const updatedUser = result.data.updateNickname
        //props.setToken(token)
        handleSetUser(updatedUser)
        setNotification(`Nickname changed to ${nickname}`, NOTIF_SUCCESS, 5)
        return null
      }
    } catch (error) {
      console.log(error.message)
      setNotification(error.message, NOTIF_WARNING, 5)
    }

  }

  const clearFields = () => {
    setOldPassword('')
    document.getElementById(`setpasswordold`).value = ''
    setNewPassword('')
    document.getElementById(`setpasswordchange`).value = ''
    setNewVeripass('')
    document.getElementById(`setveripasschange`).value = ''
  }

  const handleChangePasswordCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleChangePassword = async (event) => {
    //event.preventDefault()

    try {

      const result = await updatePassword[0]({
        variables: { username, oldPassword, newPassword }
      })
      if (result) {
        //const token = result.data.updateNickname.token
        //localStorage.setItem(USER_TOKEN, token)
        const updatedUser = result.data.updatePassword
        //props.setToken(token)
        clearFields()
        handleSetUser(updatedUser)
        window.scrollTo(0, 0)
        setNotification('Password changed', 'success', 5)
        return null
      }
    } catch (error) {
      console.log(error.message)
      setNotification(error.message, NOTIF_WARNING, 5)
    }
  }

  return (
    <Container>
      <Row>
        <Col className="Component-title">You are logged in as <font color='white'>{username}</font></Col>
        <Col>
          <Button variant="danger" type="button" value={ACTION_LOGOUT} id={ACTION_LOGOUT}
            onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col className="Component-title">You can change the nickname by which other users see you</Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col>
          <NicknameField nickname={nickname} trigger={handleNickname}
            nicknamehint={`nicknamehintchange`} setnickname={`setnicknamechange`} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" type="button" value={ACTION_CHANGE_NICKNAME} id={ACTION_CHANGE_NICKNAME}
            onClick={handleChangeNickname}>Change Nickname</Button>
        </Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col className="Component-title">To change your password enter first your old password and then the new one</Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col>
          <PasswordField password={oldPassword} trigger={handleOldPassword}
            passwordhint={`passwordhintold`} setpassword={`setpasswordold`} />
        </Col>
        <Col>
          <span>&nbsp;</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField password={newPassword} trigger={handleNewPassword}
            passwordhint={`passwordhintchange`} setpassword={`setpasswordchange`} />
        </Col>
        <Col>
          <VeripassField veripass={newVeripass} trigger={handleNewVeripass}
            veripasshint={`veripasshintchange`} setveripass={`setveripasschange`} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" type="button" value={ACTION_CHANGE_PASSWORD} id={ACTION_CHANGE_PASSWORD}
            onClick={handleChangePassword}>Change Password</Button>
          &nbsp;
            <Button variant="primary" type="button" value={ACTION_CHANGE_PASSWORD_CANCEL} id={ACTION_CHANGE_PASSWORD_CANCEL}
            onClick={handleChangePasswordCancel}>Cancel</Button>
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsForm)