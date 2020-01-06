import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateInOwnEvents, removeFromOwnEvents } from '../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_UPDATE_EVENT, ACTION_DELETE_EVENT } from '../../constants'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser,
    removeFromOwnEvents, updateInOwnEvents,
    updateEvent, deleteEvent, unfinishedEvent, display, setEvent } = props

  const [eventname, setEventname] = useState(unfinishedEvent.eventname)
  const [description, setDescription] = useState(unfinishedEvent.description)
  const [publicevent, setPublicevent] = useState(unfinishedEvent.publicevent)
  const [liveevent, setLiveevent] = useState(unfinishedEvent.liveevent)

  const controlEventname = () => {
    if (document.getElementById(`eventnamehintupdate`)) {
      if (eventname.trim() === '') {
        document.getElementById(`eventnamehintupdate`).innerHTML = 'Enter event name'
        return false
      } else if (eventname.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(`eventnamehintupdate`).innerHTML = `Event name must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`eventnamehintupdate`).innerHTML = 'Event name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(`descriptionhintupdate`)) {
      if (description.trim() === '') {
        document.getElementById(`descriptionhintupdate`).innerHTML = 'Enter description of event'
        return false
      } else if (description.trim().length < DESCRIPTION_LENGTH) {
        document.getElementById(`descriptionhintupdate`).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
        return false
      } else {
        document.getElementById(`descriptionhintupdate`).innerHTML = 'Description is long enough'
        return true
      }
    }
  }
  const controlPublicevent = () => {
    if (document.getElementById(`publiceventhintupdate`)) {
      if (publicevent === false) {
        document.getElementById(`publiceventhintupdate`).innerHTML = 'You have chosen to make the event private'
      } else {
        document.getElementById(`publiceventhintupdate`).innerHTML = 'You have chosen to make the event visible to all'
      }
    }
    return
  }
  const controlLiveevent = () => {
    if (document.getElementById(`liveeventhintupdate`)) {
      if (liveevent === false) {
        document.getElementById(`liveeventhintupdate`).innerHTML = 'You have chosen not to make the event live'
      } else {
        document.getElementById(`liveeventhintupdate`).innerHTML = 'You have chosen to make the event live'
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
    document.getElementById(`seteventnameupdate`).value = ''
    setDescription('')
    document.getElementById(`setdescriptionupdate`).value = ''
    setPublicevent(false)
    document.getElementById(`setpubliceventupdate`).checked = false
    setLiveevent(false)
    document.getElementById(`setliveeventupdate`).checked = false
  }

  const revertFields = () => {
    setEventname(unfinishedEvent.eventname)
    document.getElementById(`seteventnameupdate`).value = unfinishedEvent.eventname
    setDescription(unfinishedEvent.description)
    document.getElementById(`setdescriptionupdate`).value = unfinishedEvent.description
    setPublicevent(unfinishedEvent.publicevent)
    document.getElementById(`setpubliceventupdate`).checked = unfinishedEvent.publicevent
    setLiveevent(unfinishedEvent.liveevent)
    document.getElementById(`setliveeventupdate`).checked = unfinishedEvent.liveevent
  }

  const handleUpdateEventCancel = (event) => {
    event.preventDefault()
    revertFields()
  }

  const handleUpdateEvent = async (event) => {
    event.preventDefault()
    console.log('Update event to', eventname, '(', description, ')')
    if (eventname.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const id = unfinishedEvent.id
        const result = await updateEvent[0]({
          variables: { id, eventname, description, publicevent, liveevent }
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
      handleDeleteEvent={handleDeleteEvent} />
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
  updateInOwnEvents,
  removeFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)