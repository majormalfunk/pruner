import React from 'react'
import { USER_TOKEN } from '../../constants'
import ReloginForm from './ReloginForm'

const Relogin = ({ relogin, getOwnEvents, handleSetUser, handleError }) => {

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
            handleError(error)
          }
          handleSetUser(loggedInAs)
          //console.log('Logged in as', loggedInAs)
          return null
        }
      }
    } catch (error) {
      console.log(error.message)
      handleError(error)
    }

  }

  return (
    <ReloginForm
      handleRelogin={handleRelogin} />
  )
}

export default Relogin