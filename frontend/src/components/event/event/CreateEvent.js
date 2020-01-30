import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { addToOwnEvents } from '../../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../../constants'
import { ACTION_CREATE_EVENT } from '../../../constants'
import { FLD_CRE_HNT_EVE_DES, FLD_CRE_HNT_EVE_NAM, FLD_CRE_HNT_EVE_LIV, FLD_CRE_HNT_EVE_PUB } from '../../../constants'
import { FLD_CRE_SET_EVE_DES, FLD_CRE_SET_EVE_NAM, FLD_CRE_SET_EVE_LIV, FLD_CRE_SET_EVE_PUB } from '../../../constants'

import CreateEventForm from './CreateEventForm'

const CreateEvent = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser,
    addToOwnEvents, createEvent, display, setEvent } = props

  const [eventname, setEventname] = useState('')
  const [description, setDescription] = useState('')
  const [publicevent, setPublicevent] = useState(false)
  const [liveevent, setLiveevent] = useState(false)

  const controlEventname = () => {
    if (document.getElementById(FLD_CRE_HNT_EVE_NAM)) {
      if (eventname.trim() === '') {
        document.getElementById(FLD_CRE_HNT_EVE_NAM).innerHTML = 'Enter event name'
        return false
      } else if (eventname.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(FLD_CRE_HNT_EVE_NAM).innerHTML = `Event name must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_EVE_NAM).innerHTML = 'Event name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(FLD_CRE_HNT_EVE_DES)) {
      if (description.trim() === '') {
        document.getElementById(FLD_CRE_HNT_EVE_DES).innerHTML = 'Enter description of event'
        return false
      } else if (description.trim().length < DESCRIPTION_LENGTH) {
        document.getElementById(FLD_CRE_HNT_EVE_DES).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_EVE_DES).innerHTML = 'Description is long enough'
        return true
      }
    }
  }
  const controlPublicevent = () => {
    if (document.getElementById(FLD_CRE_HNT_EVE_PUB)) {
      if (publicevent === false) {
        document.getElementById(FLD_CRE_HNT_EVE_PUB).innerHTML = 'You have chosen to make the event private'
      } else {
        document.getElementById(FLD_CRE_HNT_EVE_PUB).innerHTML = 'You have chosen to make the event visible to all'
      }
    }
    return
  }
  const controlLiveevent = () => {
    if (document.getElementById(FLD_CRE_HNT_EVE_LIV)) {
      if (liveevent === false) {
        document.getElementById(FLD_CRE_HNT_EVE_LIV).innerHTML = 'You have chosen not to make the event live'
      } else {
        document.getElementById(FLD_CRE_HNT_EVE_LIV).innerHTML = 'You have chosen to make the event live'
      }
    }
    return
  }

  useEffect(() => {
    const eventnameOk = controlEventname()
    const descriptionOk = controlDescription()
    controlPublicevent()
    controlLiveevent()
    if (document.getElementById(ACTION_CREATE_EVENT)) {
      document.getElementById(ACTION_CREATE_EVENT).disabled = !(eventnameOk && descriptionOk)
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
    document.getElementById(FLD_CRE_SET_EVE_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_CRE_SET_EVE_DES).value = ''
    setPublicevent(false)
    document.getElementById(FLD_CRE_SET_EVE_PUB).checked = false
    setLiveevent(false)
    document.getElementById(FLD_CRE_SET_EVE_LIV).checked = false
  }

  const handleCreateEventCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateEvent = async (event) => {
    event.preventDefault()
    //console.log('Create event', eventname)
      if (eventname.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
        try {
          //window.alert(`Create event ${eventname}`)
          const result = await createEvent[0]({
            variables: { eventname, description, publicevent, liveevent }
          })
          if (result) {
            const event = result.data.createEvent
            setEvent(event)
            addToOwnEvents(event)
            displaySuccess(`New event ${event.eventname} created`)
          } else {
            displayError('Event was not created')
          }
          return null
        } catch (error) {
          clearFields()
          displayError(error)
        }
      } else {
        displayInfo('Event name or description too short')
      }

  }

  return (
    <CreateEventForm
      eventname={eventname}
      handleEventname={handleEventname}
      description={description}
      handleDescription={handleDescription}
      publicevent={publicevent}
      handlePublicevent={handlePublicevent}
      liveevent={liveevent}
      handleLiveevent={handleLiveevent}
      handleCreateEventCancel={handleCreateEventCancel}
      handleCreateEvent={handleCreateEvent} />
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
  addToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)