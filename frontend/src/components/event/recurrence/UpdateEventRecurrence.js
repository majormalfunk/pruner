import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { updateRecurrenceInOwnEvents, removeRecurrenceFromOwnEvents } from '../../../reducers/ownEventsReducer'

import { RECURRENCENAME_LENGTH, DESCRIPTION_LENGTH } from '../../../constants'
import { ACTION_UPDATE_RECURRENCE, ACTION_DELETE_RECURRENCE } from '../../../constants'
import { FLD_UPD_HNT_REC_DES, FLD_UPD_HNT_REC_NAM, FLD_UPD_HNT_REC_LIV, FLD_UPD_HNT_REC_PUB } from '../../../constants'
import { FLD_UPD_SET_REC_DES, FLD_UPD_SET_REC_NAM, FLD_UPD_SET_REC_LIV, FLD_UPD_SET_REC_PUB } from '../../../constants'
import UpdateEventRecurrenceCollapsed from './UpdateEventRecurrenceCollapsed'
import UpdateEventRecurrenceForm from './UpdateEventRecurrenceForm'

const UpdateEventRecurrence = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, ownEvents,
    updateRecurrenceInOwnEvents, removeRecurrenceFromOwnEvents,
    updateEventRecurrence, deleteEventRecurrence,
    setRecurrence, displayRecurrence, handleDisplayRecurrence } = props

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })

  const [recurrencename, setRecurrencename] = useState(unfinishedRecurrence.recurrencename)
  const [description, setDescription] = useState(unfinishedRecurrence.description)
  const [publicrecurrence, setPublicrecurrence] = useState(unfinishedRecurrence.publicrecurrence)
  const [liverecurrence, setLiverecurrence] = useState(unfinishedRecurrence.liverecurrence)
  const [launched, setLaunched] = useState(unfinishedRecurrence.launched)

  const controlRecurrencename = () => {
    if (document.getElementById(FLD_UPD_HNT_REC_NAM)) {
      if (recurrencename.trim() === '') {
        document.getElementById(FLD_UPD_HNT_REC_NAM).innerHTML = 'Enter recurrence name'
        return false
      } else if (recurrencename.trim().length < RECURRENCENAME_LENGTH) {
        document.getElementById(FLD_UPD_HNT_REC_NAM).innerHTML = `Recurrence name must be at least ${RECURRENCENAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_REC_NAM).innerHTML = 'Recurrence name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(FLD_UPD_HNT_REC_DES)) {
      if (description.trim() === '') {
        document.getElementById(FLD_UPD_HNT_REC_DES).innerHTML = 'Enter description of recurrence'
        return false
      } else if (description.trim().length < DESCRIPTION_LENGTH) {
        document.getElementById(FLD_UPD_HNT_REC_DES).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_REC_DES).innerHTML = 'Description is long enough'
        return true
      }
    }
  }
  const controlPublicrecurrence = () => {
    if (document.getElementById(FLD_UPD_HNT_REC_PUB)) {
      if (publicrecurrence === false) {
        document.getElementById(FLD_UPD_HNT_REC_PUB).innerHTML = 'You have chosen to make the recurrence private'
      } else {
        document.getElementById(FLD_UPD_HNT_REC_PUB).innerHTML = 'You have chosen to make the recurrence visible to all'
      }
    }
    return
  }
  const controlLiverecurrence = () => {
    if (document.getElementById(FLD_UPD_HNT_REC_LIV)) {
      if (liverecurrence === false) {
        document.getElementById(FLD_UPD_HNT_REC_LIV).innerHTML = 'You have chosen not to make the recurrence live'
      } else {
        document.getElementById(FLD_UPD_HNT_REC_LIV).innerHTML = 'You have chosen to make the recurrence live'
      }
    }
    return
  }

  useEffect(() => {
    const nameOk = controlRecurrencename()
    const descriptionOk = controlDescription()
    controlPublicrecurrence()
    controlLiverecurrence()
    if (document.getElementById(ACTION_UPDATE_RECURRENCE)) {
      document.getElementById(ACTION_UPDATE_RECURRENCE).disabled = !(nameOk && descriptionOk)
    }
    if (document.getElementById(ACTION_DELETE_RECURRENCE)) {
      const venuesExist = unfinishedEvent.venues.some(venue => venue.recurrence === unfinishedRecurrence.id)
      document.getElementById(ACTION_DELETE_RECURRENCE).disabled = venuesExist
    }
  })

  if (!currentUser) {
    return null
  }

  const handleRecurrencename = (event) => {
    setRecurrencename(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handlePublicrecurrence = (event) => {
    setPublicrecurrence(event.target.checked)
  }
  const handleLiverecurrence = (event) => {
    setLiverecurrence(event.target.checked)
  }


  const clearFields = () => {
    setRecurrencename('')
    document.getElementById(FLD_UPD_SET_REC_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_UPD_SET_REC_DES).value = ''
    setPublicrecurrence(false)
    document.getElementById(FLD_UPD_SET_REC_PUB).checked = false
    setLiverecurrence(false)
    document.getElementById(FLD_UPD_SET_REC_LIV).checked = false
  }

  const revertFields = () => {
    setRecurrencename(unfinishedRecurrence.recurrencename)
    document.getElementById(FLD_UPD_SET_REC_NAM).value = unfinishedRecurrence.recurrencename
    setDescription(unfinishedRecurrence.description)
    document.getElementById(FLD_UPD_SET_REC_DES).value = unfinishedRecurrence.description
    setPublicrecurrence(unfinishedRecurrence.publicrecurrence)
    document.getElementById(FLD_UPD_SET_REC_PUB).checked = unfinishedRecurrence.publicrecurrence
    setLiverecurrence(unfinishedRecurrence.liverecurrence)
    document.getElementById(FLD_UPD_SET_REC_LIV).checked = unfinishedRecurrence.liverecurrence
  }

  const handleUpdateRecurrenceCancel = (event) => {
    event.preventDefault()
    revertFields()
  }

  const handleUpdateRecurrence = async (event) => {
    event.preventDefault()
    //console.log('Update recurrence to', recurrencename, '(', description, ')')
    if (recurrencename.trim().length >= RECURRENCENAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const id = unfinishedRecurrence.id
        const result = await updateEventRecurrence[0]({
          variables: { id, recurrencename, description, publicrecurrence, liverecurrence, launched }
        })
        //console.log('Result:', result)
        if (result) {
          //const updatedRecurrence = result.data.updateRecurrence
          const updatedRecurrence = result.data.updateEventRecurrence
          const eventId = unfinishedRecurrence.event
          setRecurrence(updatedRecurrence)
          updateRecurrenceInOwnEvents(eventId, updatedRecurrence)
          displaySuccess('Recurrence info was updated')
        } else {
          displayError('Recurrence info was not updated')
        }
        return null
      } catch (error) {
        //clearFields()
        displayError('Error trying to update event recurrence')
        throw error
      }
    } else {
      displayInfo('Recurrence name or description too short')
    }
  }

  const handleDeleteRecurrence = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete recurrence ${recurrencename}?`)) {
      try {
        const id = unfinishedRecurrence.id
        console.log('Recurrence id is', id)
        const result = await deleteEventRecurrence[0]({
          variables: { id }
        })
        if (result) {
          if(result.data.deleteEventRecurrence && result.data.deleteEventRecurrence === 1) {
            const eventId = unfinishedRecurrence.event
            try {
              clearFields()
              setRecurrence(null)
              removeRecurrenceFromOwnEvents(eventId, id)
              displaySuccess('Recurrence deleted')
              console.log('Recurrence deleted')
            } catch (error) {
              console.log('Something wrong:', error)
            }
          } else {
            displayError('Recurrence was not deleted')
          }
        } else {
          displayError('Recurrence was not deleted')
        }
        return null
      } catch (error) {
        console.log('Error trying to delete event recurrence')
        //revertFields()
        displayError('Error trying to delete event recurrence')
      }
    } else {
      displayInfo('Recurrence deletion was cancelled')
    }
  }

  return (
    <Container>
      <Row>
        <Col className="Component-title">
          Event recurrence
        </Col>
      </Row>
        {(!displayRecurrence) ? (
          <UpdateEventRecurrenceCollapsed
            recurrencename={recurrencename}
            description={description}
            handleDisplayRecurrence={handleDisplayRecurrence} />
        ) : (
          <UpdateEventRecurrenceForm
            recurrencename={recurrencename}
            handleRecurrencename={handleRecurrencename}
            description={description}
            handleDescription={handleDescription}
            publicrecurrence={publicrecurrence}
            handlePublicrecurrence={handlePublicrecurrence}
            liverecurrence={liverecurrence}
            handleLiverecurrence={handleLiverecurrence}
            handleUpdateRecurrenceCancel={handleUpdateRecurrenceCancel}
            handleUpdateRecurrence={handleUpdateRecurrence}
            handleDeleteRecurrence={handleDeleteRecurrence}
            handleDisplayRecurrence={handleDisplayRecurrence} />
        )}
    </Container>
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
  updateRecurrenceInOwnEvents,
  removeRecurrenceFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventRecurrence)