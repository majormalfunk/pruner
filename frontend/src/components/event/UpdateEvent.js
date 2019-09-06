import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'

import { NOTIF_SUCCESS, NOTIF_WARNING, NOTIF_INFO } from '../../constants'
import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_UPDATE_EVENT, ACTION_DELETE_EVENT } from '../../constants'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = (props) => {

  const { setNotification, updateEvent, deleteEvent, eventToHandle, user, show, setEvent } = props

  const [eventname, setEventname] = useState(eventToHandle.eventname)
  const [description, setDescription] = useState(eventToHandle.description)
  const [publicevent, setPublicevent] = useState(eventToHandle.publicevent)

  const controlEventname = () => {
    if (document.getElementById(`eventnamehintupdate`)) {
      if (eventname.trim() === '') {
        document.getElementById(`eventnamehintupdate`).innerHTML = 'Enter eventname'
        return false
      } else if (eventname.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(`eventnamehintupdate`).innerHTML = `Eventname must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`eventnamehintupdate`).innerHTML = 'Eventname is long enough'
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

  useEffect(() => {
    const eventnameOk = controlEventname()
    const descriptionOk = controlDescription()
    controlPublicevent()
    if (document.getElementById(ACTION_UPDATE_EVENT)) {
      document.getElementById(ACTION_UPDATE_EVENT).disabled = !(eventnameOk && descriptionOk)
    }
    if (document.getElementById(ACTION_DELETE_EVENT)) {
      document.getElementById(ACTION_DELETE_EVENT).disabled = (eventToHandle.recurrences.length > 0)
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
    document.getElementById(`seteventnameupdate`).value = ''
    setDescription('')
    document.getElementById(`setdescriptionupdate`).value = ''
    setPublicevent(false)
    document.getElementById(`setpubliceventupdate`).checked = false
  }

  const revertFields = () => {
    setEventname(eventToHandle.eventname)
    document.getElementById(`seteventnameupdate`).value = eventToHandle.eventname
    setDescription(eventToHandle.description)
    document.getElementById(`setdescriptionupdate`).value = eventToHandle.description
    setPublicevent(eventToHandle.publicevent)
    document.getElementById(`setpubliceventupdate`).checked = eventToHandle.publicevent
  }

  const handleUpdateEventCancel = (event) => {
    event.preventDefault()
    revertFields()
  }

  const handleUpdateEvent = async (event) => {
    event.preventDefault()
    console.log('Update event', eventname)
    if (eventname.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const id = eventToHandle.id
        //window.alert(`Create event ${eventname}`)
        const result = await updateEvent[0]({
          variables: { id, eventname, description, publicevent }
        })
        if (result) {
          console.log('Result from updateEvent', result.data.updateEvent)
          const event = result.data.updateEvent
          setEvent(event)
          setNotification('Event info was updated', NOTIF_SUCCESS, 5)
        } else {
          setNotification('Event info was not updated', NOTIF_WARNING, 5)
        }
        return null
    } catch (error) {
        console.log(error.message)
        clearFields()
        setNotification(error.message, NOTIF_WARNING, 5)
      }
    } else {
      console.log('Eventname or description too short')
    }
  }

  const handleDeleteEvent = async (event) => {
    event.preventDefault()
    console.log('Delete event', eventname)
    if (eventToHandle.recurrences && eventToHandle.recurrences.length === 0) {
      window.alert(`Delete event ${eventname}?`)
      try {
        const id = eventToHandle.id
        const result = await deleteEvent[0]({
          variables: { id }
        })
        if (result) {
          //console.log('Result from deleteEvent', result.data.deleteEvent)
          if (result.data.deleteEvent && result.data.deleteEvent === 1) {
            setEvent(null)
            setNotification('Event deleted', NOTIF_SUCCESS, 5)
            //clearFields()
          } else {
            setNotification('Event was not deleted', NOTIF_WARNING, 5)
          }
          return null
        }
      } catch (error) {
        console.log(error.message)
        revertFields()
        setNotification(error.message, NOTIF_WARNING, 5)
      }
    } else {
      setNotification('You need to delete venues and recurrences before you can delete the event', NOTIF_INFO, 5)
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
      handleUpdateEventCancel={handleUpdateEventCancel}
      handleUpdateEvent={handleUpdateEvent}
      handleDeleteEvent={handleDeleteEvent} />
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)