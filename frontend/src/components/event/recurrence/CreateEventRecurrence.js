import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { addRecurrenceToOwnEvents } from '../../../reducers/ownEventsReducer'

import { RECURRENCENAME_LENGTH, DESCRIPTION_LENGTH } from '../../../constants'
import { ACTION_CREATE_RECURRENCE } from '../../../constants'
import { FLD_CRE_HNT_REC_DES, FLD_CRE_HNT_REC_NAM, FLD_CRE_HNT_REC_LIV, FLD_CRE_HNT_REC_PUB } from '../../../constants'
import { FLD_CRE_SET_REC_DES, FLD_CRE_SET_REC_NAM, FLD_CRE_SET_REC_LIV, FLD_CRE_SET_REC_PUB } from '../../../constants'

import CreateEventRecurrenceForm from './CreateEventRecurrenceForm'

const CreateEventRecurrence = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, ownEvents,
    addRecurrenceToOwnEvents, createEventRecurrence } = props

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })

  const [recurrencename, setRecurrencename] = useState('')
  const [description, setDescription] = useState('')
  const [publicrecurrence, setPublicrecurrence] = useState(false)
  const [liverecurrence, setLiverecurrence] = useState(false)

  const controlRecurrencename = () => {
    if (recurrencename) {
      if (document.getElementById(FLD_CRE_HNT_REC_NAM)) {
        if (recurrencename.trim() === '') {
          document.getElementById(FLD_CRE_HNT_REC_NAM).innerHTML = 'Enter recurrence name'
          return false
        } else if (recurrencename.trim().length < RECURRENCENAME_LENGTH) {
          document.getElementById(FLD_CRE_HNT_REC_NAM).innerHTML = `Recurrence name must be at least ${RECURRENCENAME_LENGTH} characters`
          return false
        } else {
          document.getElementById(FLD_CRE_HNT_REC_NAM).innerHTML = 'Recurrence name is long enough'
          return true
        }
      }
    }
  }
  const controlDescription = () => {
    if (description) {
      if (document.getElementById(FLD_CRE_HNT_REC_DES)) {
        if (description.trim() === '') {
          document.getElementById(FLD_CRE_HNT_REC_DES).innerHTML = 'Enter description of recurrence'
          return false
        } else if (description.trim().length < DESCRIPTION_LENGTH) {
          document.getElementById(FLD_CRE_HNT_REC_DES).innerHTML = `Description must be at least ${DESCRIPTION_LENGTH} characters`
          return false
        } else {
          document.getElementById(FLD_CRE_HNT_REC_DES).innerHTML = 'Description is long enough'
          return true
        }
      }
    }
  }
  const controlPublicrecurrence = () => {
    if (document.getElementById(FLD_CRE_HNT_REC_PUB)) {
      if (publicrecurrence === false) {
        document.getElementById(FLD_CRE_HNT_REC_PUB).innerHTML = 'You have chosen to make the recurrence private'
      } else {
        document.getElementById(FLD_CRE_HNT_REC_PUB).innerHTML = 'You have chosen to make the recurrence visible to all'
      }
    }
    return
  }
  const controlLiverecurrence = () => {
    if (document.getElementById(FLD_CRE_HNT_REC_LIV)) {
      if (liverecurrence === false) {
        document.getElementById(FLD_CRE_HNT_REC_LIV).innerHTML = 'You have chosen not to make the recurrence live'
      } else {
        document.getElementById(FLD_CRE_HNT_REC_LIV).innerHTML = 'You have chosen to make the recurrence live'
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
    document.getElementById(FLD_CRE_SET_REC_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_CRE_SET_REC_DES).value = ''
    setPublicrecurrence(false)
    document.getElementById(FLD_CRE_SET_REC_PUB).checked = false
    setLiverecurrence(false)
    document.getElementById(FLD_CRE_SET_REC_LIV).checked = false
  }

  const handleCreateRecurrenceCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateRecurrence = async (event) => {
    event.preventDefault()
    if (recurrencename.trim().length >= RECURRENCENAME_LENGTH && description.trim().length >= DESCRIPTION_LENGTH) {
      try {
        const eventId = unfinishedEvent.id
        const result = await createEventRecurrence[0]({
          variables: { eventId, recurrencename, description, publicrecurrence, liverecurrence }
        })
        if (result) {
          const createdRecurrence = result.data.createEventRecurrence
          addRecurrenceToOwnEvents(eventId, createdRecurrence)
          displaySuccess(`New recurrence created`)
          //setEvent(unfinishedEvent)
        } else {
          displayError('Recurrence was not created')
        }
        return null
      } catch (error) {
        //clearFields()
        console.log(error.message)
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
  addRecurrenceToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventRecurrence)