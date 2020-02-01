import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { updateEntryInOwnEvents, removeEntryFromOwnEvents } from '../../../reducers/ownEventsReducer'

import { ACTION_UPDATE_ENTRY } from '../../../constants'
import { FLD_UPD_HNT_ENT_TIM } from '../../../constants'
import { FLD_UPD_SET_ENT_TIM } from '../../../constants'
import UpdateEventEntryForm from './UpdateEventEntryForm'

const UpdateEventEntry = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser,
    updateEntryInOwnEvents, removeEntryFromOwnEvents,
    updateEventEntry, deleteEventEntry, unfinishedEntry, setSelectedEntry } = props

  const [showtime, setShowtime] = useState(unfinishedEntry.showtime)
  

  const controlShowtime = () => {
    if (document.getElementById(FLD_UPD_HNT_ENT_TIM)) {
      if (!isValidDate(showtime)) {
        document.getElementById(FLD_UPD_HNT_ENT_TIM).innerHTML = 'Select date'
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_ENT_TIM).innerHTML = `Selected date is ${showtime.toLocaleDateString()}`
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const timeOk = controlShowtime()
    if (document.getElementById(ACTION_UPDATE_ENTRY)) {
      document.getElementById(ACTION_UPDATE_ENTRY).disabled = !(timeOk)
    }
  })

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  if (!currentUser) {
    return null
  }

  const handleShowtime = (event) => {
    try {
      if (isValidDate(event)) {
        setShowtime(event)
        console.log('Selected showtime:', event)
      } else {
        console.log(event, 'was not a valid showtime')
      }
    } catch (error) {
      console.log("Error with showtime", event)
      console.log(error)
    }
  }

  const clearFields = () => {
    setShowtime(null)
    document.getElementById(FLD_UPD_SET_ENT_TIM).value = ''
  }

  const revertFields = () => {
    setShowtime(unfinishedEntry.showtime)
    document.getElementById(FLD_UPD_SET_ENT_TIM).value = unfinishedEntry.showtime
  }

  const handleUpdateEntryCancel = (event) => {
    event.preventDefault()
    revertFields()
    setSelectedEntry(null)
  }

  const handleUpdateEntry = async (event) => {
    event.preventDefault()
    //console.log('Update showtime to', showtime)
    if (isValidDate(showtime)) {
      try {
        const id = unfinishedEntry.id
        const showtimeint = showtime.getTime()
        const result = await updateEventEntry[0]({
          variables: { id, showtimeint }
        })
        //console.log('Result:', result)
        if (result) {
          const updatedEntry = result.data.updateEventEntry
          const eventId = unfinishedEntry.event
          setSelectedEntry(null)
          updateEntryInOwnEvents(eventId, updatedEntry)
          displaySuccess('Showtime was updated')
        } else {
          displayError('Showtime was not updated')
        }
        return null
      } catch (error) {
        displayError('Error trying to update event show')
        throw error
      }
    } else {
      displayInfo('Showtime was not valid')
    }
  }

  const handleDeleteEntry = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete entry at ${showtime}?`)) {
      try {
        const id = unfinishedEntry.id
        console.log('Entry id is', id)
        const result = await deleteEventEntry[0]({
          variables: { id }
        })
        if (result) {
          if(result.data.deleteEventEntry && result.data.deleteEventEntry === 1) {
            const eventId = unfinishedEntry.event
            try {
              clearFields()
              setSelectedEntry(null)
              removeEntryFromOwnEvents(eventId, id)
              displaySuccess('Entry deleted')
              console.log('Entry deleted')
            } catch (error) {
              console.log('Something wrong:', error)
            }
          }
        } else {
          displayError('Entry was not deleted')
        }
        return null
      } catch (error) {
        console.log('Error trying to delete event entry')
        //revertFields()
        displayError('Error trying to delete event entry')
      }
    } else {
      displayInfo('Entry deletion was cancelled')
    }
  }

  return (
    <UpdateEventEntryForm
      entry={unfinishedEntry}
      showtime={showtime}
      handleShowtime={handleShowtime}
      handleUpdateEntryCancel={handleUpdateEntryCancel}
      handleUpdateEntry={handleUpdateEntry}
      handleDeleteEntry={handleDeleteEntry} />
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError,
  updateEntryInOwnEvents,
  removeEntryFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventEntry)