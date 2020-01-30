import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { addVenueToOwnEvents } from '../../reducers/ownEventsReducer'

import { VENUENAME_LENGTH } from '../../constants'
import { ACTION_CREATE_VENUE } from '../../constants'
import { FLD_CRE_HNT_VEN_NAM } from '../../constants'
import { FLD_CRE_SET_VEN_NAM } from '../../constants'

import CreateEventVenueForm from './CreateEventVenueForm'

const CreateEventVenue = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, ownEvents,
    addVenueToOwnEvents, createEventVenue, display, handleDisplayVenues } = props

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })
    
  const [venuename, setVenuename] = useState('')

  const controlVenuename = () => {
    if (document.getElementById(FLD_CRE_HNT_VEN_NAM)) {
      if (venuename.trim() === '') {
        document.getElementById(FLD_CRE_HNT_VEN_NAM).innerHTML = 'Enter venue name'
        return false
      } else if (venuename.trim().length < VENUENAME_LENGTH) {
        document.getElementById(FLD_CRE_HNT_VEN_NAM).innerHTML = `Venue name must be at least ${VENUENAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_VEN_NAM).innerHTML = 'Venue name is long enough'
        return true
      }
    }
  }

  useEffect(() => {
    const nameOk = controlVenuename()
    if (document.getElementById(ACTION_CREATE_VENUE)) {
      document.getElementById(ACTION_CREATE_VENUE).disabled = !(nameOk)
    }
  })

  if (!display || !currentUser) {
    return null
  }

  const handleVenuename = (event) => {
    setVenuename(event.target.value)
  }

  const clearFields = () => {
    setVenuename('')
    document.getElementById(FLD_CRE_SET_VEN_NAM).value = ''
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
        const eventId = unfinishedEvent.id
        const recurrenceId = unfinishedRecurrence.id
        const result = await createEventVenue[0]({
          variables: { eventId, recurrenceId, venuename }
        })
        if (result) {
          const createdVenue = result.data.createEventVenue
          clearFields()
          addVenueToOwnEvents(eventId, createdVenue)
          console.log('Venue was added:')
          displaySuccess(`New venue created`)
          //setEvent(updatedEvent)
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
    <CreateEventVenueForm
      venuename={venuename}
      handleVenuename={handleVenuename}
      handleCreateVenueCancel={handleCreateVenueCancel}
      handleCreateVenue={handleCreateVenue}
      handleDisplayVenues={handleDisplayVenues} />
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
  addVenueToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventVenue)