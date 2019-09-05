import React from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'
import { NOTIF_SUCCESS, NOTIF_WARNING } from '../../constants'

import { USER_TOKEN } from '../../constants'
import ReloginForm from './ReloginForm'

const Relogin = (props) => {

  const { setNotification, relogin, getOwnEvents, handleSetUser } = props

  const handleRelogin = async (event) => {
    event.preventDefault()

    try {
      //console.log('Trying to relogin')
      const tokenFromStorage = window.localStorage.getItem(USER_TOKEN)
      if (tokenFromStorage && tokenFromStorage.length > 0) {
        //console.log('We have a token', tokenFromStorage)
        //console.log('We shall try to relogin')
        const result = await relogin[0]({
          variables: { tokenFromStorage }
        })
        //console.log('Didnt crash yet')
        if (result) {
          let loggedInAs = result.data.relogin
          window.localStorage.setItem(USER_TOKEN, loggedInAs.token)
          const username = loggedInAs.username
          loggedInAs.events = []
          try {
            //console.log('Own events for', username)
            const eventsResult = await getOwnEvents[0]({
              variables: { username }
            })
            //console.log('Data:', eventsResult.data)
            if (eventsResult.data) {
              //console.log('Got something from own events')
              //console.log(eventsResult.data.getOwnEvents)
              loggedInAs.events = eventsResult.data.getOwnEvents
            }
          } catch (error) {
            console.log('Couldnt get own events in relogin', error.message)
            setNotification('Something went wrong fetching your own events', NOTIF_WARNING, 5)
          }
          handleSetUser(loggedInAs)
          setNotification(`Logged in as ${loggedInAs.username}`, NOTIF_SUCCESS, 5)
        //console.log('Logged in as', loggedInAs)
          return null
        }
      }
    } catch (error) {
      console.log(error.message)
      setNotification(error.message, NOTIF_WARNING, 5)
    }

  }

  return (
    <ReloginForm
      handleRelogin={handleRelogin} />
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Relogin)