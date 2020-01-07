import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateVenueInOwnEvents, removeVenueFromOwnEvents } from '../../reducers/ownEventsReducer'

import { VENUENAME_LENGTH } from '../../constants'
import { ACTION_UPDATE_VENUE } from '../../constants'
import { FLD_UPD_HNT_VEN_NAM } from '../../constants'
import { FLD_UPD_SET_VEN_NAM } from '../../constants'
import UpdateEventVenueForm from './UpdateEventVenueForm'

const UpdateEventVenue = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, display,
    updateVenueInOwnEvents, removeVenueFromOwnEvents,
    updateEventVenue, deleteEventVenue, unfinishedVenue, setSelectedVenue } = props

  const [venuename, setVenuename] = useState(unfinishedVenue.venuename)

  const controlVenuename = () => {
    if (document.getElementById(FLD_UPD_HNT_VEN_NAM)) {
      if (venuename.trim() === '') {
        document.getElementById(FLD_UPD_HNT_VEN_NAM).innerHTML = 'Enter venue name'
        return false
      } else if (venuename.trim().length < VENUENAME_LENGTH) {
        document.getElementById(FLD_UPD_HNT_VEN_NAM).innerHTML = `Venue name must be at least ${VENUENAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_VEN_NAM).innerHTML = 'Venue name is long enough'
        return true
      }
    }
  }

  useEffect(() => {
    const nameOk = controlVenuename()
    if (document.getElementById(ACTION_UPDATE_VENUE)) {
      document.getElementById(ACTION_UPDATE_VENUE).disabled = !(nameOk)
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
    document.getElementById(FLD_UPD_SET_VEN_NAM).value = ''
  }

  const revertFields = () => {
    setVenuename(unfinishedVenue.venuename)
    document.getElementById(FLD_UPD_SET_VEN_NAM).value = unfinishedVenue.venuename
  }

  const handleUpdateVenueCancel = (event) => {
    event.preventDefault()
    revertFields()
    setSelectedVenue(null)
  }

  const handleUpdateVenue = async (event) => {
    event.preventDefault()
    //console.log('Update venue to', venuename)
    if (venuename.trim().length >= VENUENAME_LENGTH) {
      try {
        const id = unfinishedVenue.id
        const result = await updateEventVenue[0]({
          variables: { id, venuename }
        })
        //console.log('Result:', result)
        if (result) {
          const updatedVenue = result.data.updateEventVenue
          const eventId = unfinishedVenue.event
          setSelectedVenue(null)
          updateVenueInOwnEvents(eventId, updatedVenue)
          displaySuccess('Venue info was updated')
        } else {
          displayError('Venue info was not updated')
        }
        return null
      } catch (error) {
        //clearFields()
        displayError('Error trying to update event venue')
        throw error
      }
    } else {
      displayInfo('Venue name too short')
    }
  }

  const handleDeleteVenue = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete venue ${venuename}?`)) {
      try {
        const id = unfinishedVenue.id
        console.log('Venue id is', id)
        const result = await deleteEventVenue[0]({
          variables: { id }
        })
        if (result) {
          if(result.data.deleteEventVenue && result.data.deleteEventVenue === 1) {
            const eventId = unfinishedVenue.event
            try {
              clearFields()
              setSelectedVenue(null)
              removeVenueFromOwnEvents(eventId, id)
              displaySuccess('Venue deleted')
              console.log('Venue deleted')
            } catch (error) {
              console.log('Something wrong:', error)
            }
          }
        } else {
          displayError('Venue was not deleted')
        }
        return null
      } catch (error) {
        console.log('Error trying to delete event venue')
        //revertFields()
        displayError('Error trying to delete event venue')
      }
    } else {
      displayInfo('Venue deletion was cancelled')
    }
  }

  return (
    <UpdateEventVenueForm
      venuename={venuename}
      handleVenuename={handleVenuename}
      handleUpdateVenueCancel={handleUpdateVenueCancel}
      handleUpdateVenue={handleUpdateVenue}
      handleDeleteVenue={handleDeleteVenue} />
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
  updateVenueInOwnEvents,
  removeVenueFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventVenue)