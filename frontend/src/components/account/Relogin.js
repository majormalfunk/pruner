import React from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayError } from '../../reducers/notificationReducer'
import { setCurrentUser } from '../../reducers/userReducer'
import { setOwnEvents } from '../../reducers/ownEventsReducer'

import { USER_TOKEN } from '../../constants'
import ReloginForm from './ReloginForm'

const Relogin = (props) => {

  const { displaySuccess, displayError, relogin, setCurrentUser, getOwnEvents, setOwnEvents } = props

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
          //window.localStorage.setItem(USER_TOKEN, loggedInAs.token)
          setCurrentUser(loggedInAs)
          const username = loggedInAs.username
          try {
            //console.log('Own events for', username)
            const eventsResult = await getOwnEvents[0]({
              variables: { username }
            })
            //console.log('Data:', eventsResult.data)
            if (eventsResult.data) {
              //console.log('Got something from own events')
              //console.log(eventsResult.data.getOwnEvents)
              setOwnEvents(eventsResult.data.getOwnEvents)
            }
          } catch (error) {
            console.log('Couldnt get own events in relogin', error.message)
            displayError('Something went wrong fetching your own events')
          }
          displaySuccess(`Logged in as ${loggedInAs.username}`)
          return null
        }
      }
    } catch (error) {
      console.log(error.message)
      displayError(error)
    }

  }

  return (
    <ReloginForm handleRelogin={handleRelogin} />
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayError,
  setCurrentUser,
  setOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Relogin)