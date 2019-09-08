import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateInOwnEvents } from '../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_CREATE_RECURRENCE } from '../../constants'

import CreateEventRecurrenceForm from './CreateEventRecurrenceForm'

const CreateEventRecurrence = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, unfinishedEvent,
    updateInOwnEvents, createEventRecurrence, show, setEvent } = props

  const [recurrencename, setRecurrencename] = useState('')
  const [description, setDescription] = useState('')
  const [publicrecurrence, setPublicrecurrence] = useState(false)
  const [liverecurrence, setLiverecurrence] = useState(false)

  const controlRecurrencename = () => {
    if (document.getElementById(`recurrencenamehintcreate`)) {
      if (recurrencename.trim() === '') {
        document.getElementById(`recurrencenamehintcreate`).innerHTML = 'Enter recurrence name'
        return false
      } else if (recurrencename.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(`recurrencenamehintcreate`).innerHTML = `Recurrence name must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`recurrencenamehintcreate`).innerHTML = 'Recurrence name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(`descriptionhintcreate`)) {
      if (description.trim() === '') {
        document.getElementById(`descriptionhintcreate`).innerHTML = 'Enter description of recurrence'
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
  const controlPublicrecurrence = () => {
    if (document.getElementById(`publicrecurrencehintcreate`)) {
      if (publicrecurrence === false) {
        document.getElementById(`publicrecurrencehintcreate`).innerHTML = 'You have chosen to make the recurrence private'
      } else {
        document.getElementById(`publicrecurrencehintcreate`).innerHTML = 'You have chosen to make the recurrence visible to all'
      }
    }
    return
  }
  const controlLiverecurrence = () => {
    if (document.getElementById(`liverecurrencehintcreate`)) {
      if (liverecurrence === false) {
        document.getElementById(`liverecurrencehintcreate`).innerHTML = 'You have chosen not to make the recurrence live'
      } else {
        document.getElementById(`liverecurrencehintcreate`).innerHTML = 'You have chosen to make the recurrence live'
      }
    }
    return
  }

  useEffect(() => {
    const nameOk = controlRecurrencename()
    const descriptionOk = controlDescription()
    controlPublicrecurrence()
    controlLiverecurrence()
    if (document.getElementById(ACTION_CREATE_RECURRENCE)) {
      document.getElementById(ACTION_CREATE_RECURRENCE).disabled = !(nameOk && descriptionOk)
    }
  })

  if (!show || !currentUser) {
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
    document.getElementById(`setrecurrencenamecreate`).value = ''
    setDescription('')
    document.getElementById(`setdescriptioncreate`).value = ''
    setPublicrecurrence(false)
    document.getElementById(`setpublicrecurrencecreate`).checked = false
    setLiverecurrence(false)
    document.getElementById(`setliverecurrencecreate`).checked = false
  }

  const handleCreateRecurrenceCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateRecurrence = async (event) => {
    event.preventDefault()
    console.log('Create recurrence', recurrencename)
      if (recurrencename.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
        try {
          //window.alert(`Create event ${eventname}`)
          const id = unfinishedEvent.id
          const result = await createEventRecurrence[0]({
            variables: { id, recurrencename, description, publicrecurrence, liverecurrence }
          })
          if (result) {
            const updatedEvent = result.data.createRecurrence
            setEvent(updatedEvent)
            updateInOwnEvents(updatedEvent)
            console.log('Recurrence was added:', updatedEvent)
            displaySuccess(`New recurrence ${recurrencename} created`)
          } else {
            displayError('Recurrence was not created')
          }
          return null
        } catch (error) {
          clearFields()
          displayError(error)
        }
      } else {
        displayInfo('Recurrence name or description too short')
      }

  }

  return (
    <CreateEventRecurrenceForm
      recurrencename={recurrencename}
      handleRecurrencename={handleRecurrencename}
      description={description}
      handleDescription={handleDescription}
      publicrecurrence={publicrecurrence}
      handlePublicrecurrence={handlePublicrecurrence}
      liverecurrence={liverecurrence}
      handleLiverecurrence={handleLiverecurrence}
      handleCreateRecurrenceCancel={handleCreateRecurrenceCancel}
      handleCreateRecurrence={handleCreateRecurrence} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventRecurrence)