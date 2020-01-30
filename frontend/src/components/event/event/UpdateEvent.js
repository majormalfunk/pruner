import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { updateInOwnEvents, removeFromOwnEvents } from '../../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../../constants'
import { ACTION_UPDATE_EVENT, ACTION_DELETE_EVENT, ACTION_LAUNCH_EVENT } from '../../../constants'
import { FLD_UPD_HNT_EVE_DES, FLD_UPD_HNT_EVE_NAM, FLD_UPD_HNT_EVE_LIV, FLD_UPD_HNT_EVE_PUB } from '../../../constants'
import { FLD_UPD_SET_EVE_DES, FLD_UPD_SET_EVE_NAM, FLD_UPD_SET_EVE_LIV, FLD_UPD_SET_EVE_PUB } from '../../../constants'
import UpdateEventCollapsed from './UpdateEventCollapsed'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, ownEvents,
    removeFromOwnEvents, updateInOwnEvents, updateEvent, deleteEvent,
    display, setEvent, displayEvent, handleDisplayEvent } = props

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })
  const venuesExist = unfinishedEvent.venues.some(venue => venue.recurrence === unfinishedRecurrence.id)
  const showsExist = unfinishedEvent.shows.some(show => show.recurrence === unfinishedRecurrence.id)
  const entriesExist = unfinishedEvent.entries.some(entry => entry.recurrence === unfinishedRecurrence.id)
  const readyToLaunch = (venuesExist && showsExist && entriesExist)
  
  const [eventname, setEventname] = useState(unfinishedEvent.eventname)
  const [description, setDescription] = useState(unfinishedEvent.description)
  const [publicevent, setPublicevent] = useState(unfinishedEvent.publicevent)
  const [liveevent, setLiveevent] = useState(unfinishedEvent.liveevent)
  const [launched, setLaunched] = useState(unfinishedEvent.launched)

  const controlEventname = () => {
    if (document.getElementById(FLD_UPD_HNT_EVE_NAM)) {
      if (eventname.trim() === '') {
        document.getElementById(FLD_UPD_HNT_EVE_NAM).innerHTML = 'Enter event name'
        return false
      } else if (eventname.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(FLD_UPD_HNT_EVE_NAM).innerHTML = `Event name must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_EVE_NAM).innerHTML = 'Event name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(FLD_UPD_HNT_EVE_DES)) {
      if (description.trim() === '') {
        document.getElementById(FLD_UPD_HNT_EVE_DES).innerHTML = 'Enter description of event'
        return false
      } else if (description.trim().length < DESCRIPTION_LENGTH) {
        document.getElementById(FLD_UPD_HNT_EVE_DES).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_EVE_DES).innerHTML = 'Description is long enough'
        return true
      }
    }
  }
  const controlPublicevent = () => {
    if (document.getElementById(FLD_UPD_HNT_EVE_PUB)) {
      if (publicevent === false) {
        document.getElementById(FLD_UPD_HNT_EVE_PUB).innerHTML = 'You have chosen to make the event private'
      } else {
        document.getElementById(FLD_UPD_HNT_EVE_PUB).innerHTML = 'You have chosen to make the event visible to all'
      }
    }
    return
  }
  const controlLiveevent = () => {
    if (document.getElementById(FLD_UPD_HNT_EVE_LIV)) {
      if (liveevent === false) {
        document.getElementById(FLD_UPD_HNT_EVE_LIV).innerHTML = 'You have chosen not to make the event live'
      } else {
        document.getElementById(FLD_UPD_HNT_EVE_LIV).innerHTML = 'You have chosen to make the event live'
      }
    }
    return
  }

  useEffect(() => {
    const eventnameOk = controlEventname()
    const descriptionOk = controlDescription()
    controlPublicevent()
    controlLiveevent()
    if (document.getElementById(ACTION_UPDATE_EVENT)) {
      document.getElementById(ACTION_UPDATE_EVENT).disabled = !(eventnameOk && descriptionOk)
    }
    if (document.getElementById(ACTION_DELETE_EVENT)) {
      document.getElementById(ACTION_DELETE_EVENT).disabled = (unfinishedEvent.recurrences.length > 0)
    }
  })

  if (!display || !currentUser) {
    return null
  }

  const handleEventname = (event) => {
    setEventname(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handlePublicevent = (event) => {
    setPublicevent(event.target.checked)
  }
  const handleLiveevent = (event) => {
    setLiveevent(event.target.checked)
  }

  const clearFields = () => {
    setEventname('')
    document.getElementById(FLD_UPD_SET_EVE_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_UPD_SET_EVE_DES).value = ''
    setPublicevent(false)
    document.getElementById(FLD_UPD_SET_EVE_PUB).checked = false
    setLiveevent(false)
    document.getElementById(FLD_UPD_SET_EVE_LIV).checked = false
  }

  const revertFields = () => {
    setEventname(unfinishedEvent.eventname)
    document.getElementById(FLD_UPD_SET_EVE_NAM).value = unfinishedEvent.eventname
    setDescription(unfinishedEvent.description)
    document.getElementById(FLD_UPD_SET_EVE_DES).value = unfinishedEvent.description
    setPublicevent(unfinishedEvent.publicevent)
    document.getElementById(FLD_UPD_SET_EVE_PUB).checked = unfinishedEvent.publicevent
    setLiveevent(unfinishedEvent.liveevent)
    document.getElementById(FLD_UPD_SET_EVE_LIV).checked = unfinishedEvent.liveevent
  }

  const handleUpdateEventCancel = (event) => {
    event.preventDefault()
    revertFields()
  }

  const handleLaunchEvent = async (event) => {
    event.preventDefault()
    console.log('Launching event!')
    displayInfo('Launching event!')
  }

  const handleUpdateEvent = async (event) => {
    event.preventDefault()
    console.log('Update event to', eventname, '(', description, ')')
    if (eventname.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const id = unfinishedEvent.id
        const result = await updateEvent[0]({
          variables: { id, eventname, description, publicevent, liveevent, launched }
        })
        if (result) {
          const updatedEvent = result.data.updateEvent
          setEvent(updatedEvent)
          updateInOwnEvents(updatedEvent)
          displaySuccess('Event info was updated')
        } else {
          displayError('Event info was not updated')
        }
        return null
      } catch (error) {
        clearFields()
        displayError(error)
      }
    } else {
      displayInfo('Eventname or description too short')
    }
  }

  const handleDeleteEvent = async (event) => {
    event.preventDefault()
    if (unfinishedEvent.recurrences && unfinishedEvent.recurrences.length === 0) {
      if (window.confirm(`Delete event ${eventname}?`)) {
        try {
          const id = unfinishedEvent.id
          const result = await deleteEvent[0]({
            variables: { id }
          })
          if (result) {
            if (result.data.deleteEvent && result.data.deleteEvent === 1) {
              setEvent(null)
              removeFromOwnEvents(unfinishedEvent)
              displaySuccess('Event deleted')
            } else {
              displayError('Event was not deleted')
            }
            return null
          }
        } catch (error) {
          revertFields()
          displayError(error)
        }
      } else {
        displayInfo('Event deletion was cancelled')
      }
    } else {
      displayInfo('You need to delete recurrences before you can delete the event')
    }
  }

  return (
    <Container>
      {(true) ? (
        <Form>
          <Row>
            <Col className="Component-title">
              <span>This event is ready to launch</span>
            </Col>
          </Row>
          <Row>
            <Col className="Component-title">
            <Button variant="action" type="button" value={ACTION_LAUNCH_EVENT} id={ACTION_LAUNCH_EVENT}
                onClick={handleLaunchEvent}>Launch!</Button>
            </Col>
          </Row>
        </Form>
            ) : (
        <Row>
          <Col className="Component-title">
              <span>This event needs some more data before it can be used in a plan</span>
          </Col>
        </Row>
      )}
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-title">
            Your Event
          </Col>
        </Row>
          {(!displayEvent) ? (
            <UpdateEventCollapsed
              eventname={eventname}
              description={description}
              handleDisplayEvent={handleDisplayEvent} />
          ) : (
            <UpdateEventForm
              eventname={eventname}
              handleEventname={handleEventname}
              description={description}
              handleDescription={handleDescription}
              publicevent={publicevent}
              handlePublicevent={handlePublicevent}
              liveevent={liveevent}
              handleLiveevent={handleLiveevent}
              handleUpdateEventCancel={handleUpdateEventCancel}
              handleUpdateEvent={handleUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
              handleDisplayEvent={handleDisplayEvent} />
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
  updateInOwnEvents,
  removeFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)