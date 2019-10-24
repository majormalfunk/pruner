import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateInOwnEvents } from '../../reducers/ownEventsReducer'

import { VENUENAME_LENGTH } from '../../constants'
import { ACTION_CREATE_VENUE } from '../../constants'

import CreateRecurrenceVenueForm from './CreateRecurrenceVenueForm'

const CreateRecurrenceVenue = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, unfinishedRecurrence,
    updateInOwnEvents, createRecurrenceVenue, show, setEvent } = props

  const [venuename, setVenuename] = useState('')

  const controlVenuename = () => {
    if (venuename) {
      if (document.getElementById(`venuenamehintcreate`)) {
        if (venuename.trim() === '') {
          document.getElementById(`venuenamehintcreate`).innerHTML = 'Enter venue name'
          return false
        } else if (venuename.trim().length < VENUENAME_LENGTH) {
          document.getElementById(`venuenamehintcreate`).innerHTML = `Venue name must be at least ${VENUENAME_LENGTH} characters`
          return false
        } else {
          document.getElementById(`venuenamehintcreate`).innerHTML = 'Venue name is long enough'
          return true
        }
      }
    }
  }

  useEffect(() => {
    const nameOk = controlVenuename()
    if (document.getElementById(ACTION_CREATE_VENUE)) {
      document.getElementById(ACTION_CREATE_VENUE).disabled = !(nameOk)
    }
  })

  if (!show || !currentUser) {
    return null
  }

  const handleVenuename = (event) => {
    setVenuename(event.target.value)
  }

  const clearFields = () => {
    setVenuename('')
    document.getElementById(`setvenuenamecreate`).value = ''
  }

  const handleCreateVenueCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateVenue = async (event) => {
    event.preventDefault()
    console.log('Create venue', venuename)
    if (venuename.trim().length >= VENUENAME_LENGTH) {
      try {
        //window.alert(`Create venue ${venuename}`)
        const id = unfinishedRecurrence.id
        const result = await createRecurrenceVenue[0]({
          variables: { id, venuename }
        })
        if (result) {
          const updatedEvent = result.data.createRecurrenceVenue
          console.log('Created venue, event is', updatedEvent)
          console.log('Event was set')
          updateInOwnEvents(updatedEvent)
          console.log('Venue was added:', updatedEvent)
          displaySuccess(`New venue created`)
          setEvent(updatedEvent)
        } else {
          displayError('Venue was not created')
        }
        return null
      } catch (error) {
        //clearFields()
        console.log(error.message)
        displayError(error)
      }
    } else {
      displayInfo('Venue name too short')
    }

  }

  return (
    <CreateRecurrenceVenueForm
      venuename={venuename}
      handleVenuename={handleVenuename}
      handleCreateVenueCancel={handleCreateVenueCancel}
      handleCreateVenue={handleCreateVenue} />
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    ownEvents: state.ownEvents
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError,
  updateInOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecurrenceVenue)