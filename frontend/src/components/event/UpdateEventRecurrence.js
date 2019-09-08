import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateRecurrenceInOwnEvents, removeRecurrenceFromOwnEvents } from '../../reducers/ownEventsReducer'

import { EVENTNAME_LENGTH, DESCRIPTION_LENGTH } from '../../constants'
import { ACTION_UPDATE_RECURRENCE, ACTION_DELETE_RECURRENCE } from '../../constants'
import UpdateEventRecurrenceForm from './UpdateEventRecurrenceForm'

const UpdateEventRecurrence = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser,
    updateRecurrence, deleteRecurrence, unfinishedRecurrence, show, setRecurrence } = props

  const [recurrencename, setRecurrencename] = useState(unfinishedRecurrence.recurrencename)
  const [description, setDescription] = useState(unfinishedRecurrence.description)
  const [publicrecurrence, setPublicrecurrence] = useState(unfinishedRecurrence.publicrecurrence)
  const [liverecurrence, setLiverecurrence] = useState(unfinishedRecurrence.liverecurrence)

  const controlRecurrencename = () => {
    if (document.getElementById(`recurrencenamehintupdate`)) {
      if (recurrencename.trim() === '') {
        document.getElementById(`recurrencenamehintupdate`).innerHTML = 'Enter recurrence name'
        return false
      } else if (recurrencename.trim().length < EVENTNAME_LENGTH) {
        document.getElementById(`recurrencenamehintupdate`).innerHTML = `Recurrence name must be at least ${EVENTNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(`recurrencenamehintupdate`).innerHTML = 'Recurrence name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(`descriptionhintupdate`)) {
      if (description.trim() === '') {
        document.getElementById(`descriptionhintupdate`).innerHTML = 'Enter description of recurrence'
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
  const controlPublicrecurrence = () => {
    if (document.getElementById(`publicrecurrencehintupdate`)) {
      if (publicrecurrence === false) {
        document.getElementById(`publicrecurrencehintupdate`).innerHTML = 'You have chosen to make the recurrence private'
      } else {
        document.getElementById(`publicrecurrencehintupdate`).innerHTML = 'You have chosen to make the recurrence visible to all'
      }
    }
    return
  }
  const controlLiverecurrence = () => {
    if (document.getElementById(`liverecurrencehintupdate`)) {
      if (liverecurrence === false) {
        document.getElementById(`liverecurrencehintupdate`).innerHTML = 'You have chosen not to make the recurrence live'
      } else {
        document.getElementById(`liverecurrencehintupdate`).innerHTML = 'You have chosen to make the recurrence live'
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
    // if (document.getElementById(ACTION_DELETE_RECURRENCE)) {
    //   document.getElementById(ACTION_DELETE_RECURRENCE).disabled = (unfinishedRecurrence. ???? )
    // }
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
    document.getElementById(`setrecurrencenameupdate`).value = ''
    setDescription('')
    document.getElementById(`setdescriptionupdate`).value = ''
    setPublicrecurrence(false)
    document.getElementById(`setpublicrecurrenceupdate`).checked = false
    setLiverecurrence(false)
    document.getElementById(`setliverecurrenceupdate`).checked = false
  }

  const revertFields = () => {
    setRecurrencename(unfinishedRecurrence.eventname)
    document.getElementById(`setrecurrencenameupdate`).value = unfinishedRecurrence.recurrencename
    setDescription(unfinishedRecurrence.description)
    document.getElementById(`setdescriptionupdate`).value = unfinishedRecurrence.description
    setPublicrecurrence(unfinishedRecurrence.publicevent)
    document.getElementById(`setpublicrecurrenceupdate`).checked = unfinishedRecurrence.publicrecurrence
    setLiverecurrence(unfinishedRecurrence.liverecurrence)
    document.getElementById(`setliverecurrenceupdate`).checked = unfinishedRecurrence.liverecurrence
  }

  const handleUpdateRecurrenceCancel = (event) => {
    event.preventDefault()
    revertFields()
  }

  const handleUpdateRecurrence = async (event) => {
    event.preventDefault()
    console.log('Update recurrence to', recurrencename, '(', description, ')')
    if (recurrencename.trim().length >= EVENTNAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const id = unfinishedRecurrence.id
        const result = await updateRecurrence[0]({
          variables: { id, recurrencename, description, publicrecurrence, liverecurrence }
        })
        if (result) {
          const updatedRecurrence = result.data.updateRecurrence
          setRecurrence(updatedRecurrence)
          updateRecurrenceInOwnEvents(updatedRecurrence, event.id)
          displaySuccess('Recurrence info was updated')
        } else {
          displayError('Recurrence info was not updated')
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

  const handleDeleteRecurrence = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete recurrence ${recurrencename}?`)) {
      try {
        const id = unfinishedRecurrence.id
        const result = await deleteRecurrence[0]({
          variables: { id }
        })
        if (result) {
          if (result.data.deleteRecurrence && result.data.deleteRecurrence === 1) {
            setRecurrence(null)
            removeRecurrenceFromOwnEvents(unfinishedRecurrence, event.id)
            displaySuccess('Recurrence deleted')
          } else {
            displayError('Recurrence was not deleted')
          }
          return null
        }
      } catch (error) {
        revertFields()
        displayError(error)
      }
    } else {
      displayInfo('Recurrence deletion was cancelled')
    }
  }

  return (
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
      handleDeleteRecurrence={handleDeleteRecurrence} />
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
  updateRecurrenceInOwnEvents,
  removeRecurrenceFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventRecurrence)