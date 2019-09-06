import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'
import { addToOwnEvents } from '../../reducers/ownEventsReducer'

import { NOTIF_SUCCESS, NOTIF_WARNING, NOTIF_INFO } from '../../constants'
import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_CREATE_EVENT } from '../../constants'

import CreateEventForm from './CreateEventForm'

const CreateEvent = (props) => {

  const { setNotification, addToOwnEvents, createEvent, user, show, setEvent } = props

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
    console.log('Create event', eventname)
      if (eventname.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
        try {
          //window.alert(`Create event ${eventname}`)
          const result = await createEvent[0]({
            variables: { eventname, description, publicevent }
          })
          if (result) {
            console.log('Before events', props.ownEvents.length)
            console.log('Result from createEvent', result.data.createEvent)
            const event = result.data.createEvent
            setEvent(event)
            addToOwnEvents(event)
            setNotification('New event created', NOTIF_SUCCESS, 5)
          } else {
            setNotification('Event was not created', NOTIF_WARNING, 5)
          }
          return null
        } catch (error) {
          console.log(error.message)
          clearFields()
          setNotification(error.message, NOTIF_WARNING, 5)
        }
      } else {
        console.log('Eventname or description too short')
        setNotification('Eventname or description too short', NOTIF_INFO, 5)
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
  setNotification,
  addToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)