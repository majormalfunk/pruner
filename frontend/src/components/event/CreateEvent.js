import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { addToOwnEvents } from '../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_CREATE_EVENT } from '../../constants'

import CreateEventForm from './CreateEventForm'

const CreateEvent = (props) => {

  const { displaySuccess, displayInfo, displayError, addToOwnEvents, createEvent, user, show, setEvent } = props

  const [eventname, setEventname] = useState('')
  const [description, setDescription] = useState('')
  const [publicevent, setPublicevent] = useState(false)

  const controlEventname = () => {
    if (document.getElementById(`eventnamehintcreate`)) {
      if (eventname.trim() === '') {
        document.getElementById(`eventnamehintcreate`).innerHTML = 'Enter eventname'
        return false
      } else if (eventname.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(`eventnamehintcreate`).innerHTML = `Eventname must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`eventnamehintcreate`).innerHTML = 'Eventname is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(`descriptionhintcreate`)) {
      if (description.trim() === '') {
        document.getElementById(`descriptionhintcreate`).innerHTML = 'Enter description of event'
        return false
      } else if (description.trim().length < DESCRIPTION_LENGTH) {
        document.getElementById(`descriptionhintcreate`).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
        return false
      } else {
        document.getElementById(`descriptionhintcreate`).innerHTML = 'Description is long enough'
        return true
      }
    }
  }
  const controlPublicevent = () => {
    if (document.getElementById(`publiceventhintcreate`)) {
      if (publicevent === false) {
        document.getElementById(`publiceventhintcreate`).innerHTML = 'You have chosen to make the event private'
      } else {
        document.getElementById(`publiceventhintcreate`).innerHTML = 'You have chosen to make the event visible to all'
      }
    }
    return
  }

  useEffect(() => {
    const eventnameOk = controlEventname()
    const descriptionOk = controlDescription()
    controlPublicevent()
    if (document.getElementById(ACTION_CREATE_EVENT)) {
      document.getElementById(ACTION_CREATE_EVENT).disabled = !(eventnameOk && descriptionOk)
    }
  })

  if (!show || !user) {
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

  const clearFields = () => {
    setEventname('')
    document.getElementById(`seteventnamecreate`).value = ''
    setDescription('')
    document.getElementById(`setdescriptioncreate`).value = ''
    setPublicevent(false)
    document.getElementById(`setpubliceventcreate`).checked = false
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
            variables: { eventname, description, publicevent }
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
        displayInfo('Eventname or description too short')
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
      handleCreateEventCancel={handleCreateEventCancel}
      handleCreateEvent={handleCreateEvent} />
  )
}

const mapStateToProps = (state) => {
  return {
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