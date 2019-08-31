import React from 'react'
import { USER_TOKEN } from '../../constants'
import ReloginForm from './ReloginForm'

const Relogin = ({ handleSetUser, relogin, handleError }) => {

  const handleRelogin = async (event) => {
    event.preventDefault()

    try {
      //console.log('Trying to relogin')
      const tokenFromStorage = window.localStorage.getItem(USER_TOKEN)
      if (tokenFromStorage && tokenFromStorage.length > 0) {
        //console.log('We have a token', tokenFromStorage)
        console.log('We shall try to relogin')
        const result = await relogin[0]({
          variables: { tokenFromStorage }
        })
        console.log('Didnt crash yet')
        if (result) {
          const loggedInAs = result.data.relogin
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