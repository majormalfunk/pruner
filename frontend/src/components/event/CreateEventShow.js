import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { addShowToOwnEvents } from '../../reducers/ownEventsReducer'

import { SHOWNAME_LENGTH } from '../../constants'
import { ACTION_CREATE_SHOW } from '../../constants'
import { FLD_CRE_HNT_SHO_DES, FLD_CRE_HNT_SHO_NAM, FLD_CRE_HNT_SHO_LNK, FLD_CRE_HNT_SHO_DUR } from '../../constants'
import { FLD_CRE_SET_SHO_DES, FLD_CRE_SET_SHO_NAM, FLD_CRE_SET_SHO_LNK, FLD_CRE_SET_SHO_DUR } from '../../constants'

import CreateEventShowForm from './CreateEventShowForm'

const CreateEventShow = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, unfinishedEvent, unfinishedRecurrence,
    addShowToOwnEvents, createEventShow, display, handleDisplayShows } = props

  const [showname, setShowname] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [duration, setDuration] = useState(0)

  const controlShowname = () => {
    if (document.getElementById(FLD_CRE_HNT_SHO_NAM)) {
      if (showname.trim() === '') {
        document.getElementById(FLD_CRE_HNT_SHO_NAM).innerHTML = 'Enter show name'
        return false
      } else if (showname.trim().length < SHOWNAME_LENGTH) {
        document.getElementById(FLD_CRE_HNT_SHO_NAM).innerHTML = `Show name must be at least ${SHOWNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_SHO_NAM).innerHTML = 'Show name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(FLD_CRE_HNT_SHO_DES)) {
      if (description.trim() === '') {
        document.getElementById(FLD_CRE_HNT_SHO_DES).innerHTML = 'You should give a short description of the show'
      } else {
        document.getElementById(FLD_CRE_HNT_SHO_DES).innerHTML = 'Planners will see this description'
      }
    }
    return
  }
  const controlLink = () => {
    if (document.getElementById(FLD_CRE_HNT_SHO_LNK)) {
      if (link.trim() === '') {
        document.getElementById(FLD_CRE_HNT_SHO_LNK).innerHTML = 'You can provide a link for the show'
      } else {
        document.getElementById(FLD_CRE_HNT_SHO_LNK).innerHTML = 'Planners will see this link'
      }
    }
    return
  }
  const controlDuration = () => {
    if (isNaN(duration)) {
      document.getElementById(FLD_CRE_HNT_SHO_DUR).innerHTML = `Show duration should be a number`
      return false
    }
    if (document.getElementById(FLD_CRE_HNT_SHO_DUR)) {
      if (duration < 0) {
        document.getElementById(FLD_CRE_HNT_SHO_DUR).innerHTML = 'Show´s duration can´t be negative'
        return false
      } else if (duration === 0) {
        document.getElementById(FLD_CRE_HNT_SHO_DUR).innerHTML = 'Are you sure the show takes less than a minute?'
        return true
      } else {
        document.getElementById(FLD_CRE_HNT_SHO_DUR).innerHTML = `Show duration is ${duration} minutes`
        return true
      }
    }
  }

  useEffect(() => {
    const nameOk = controlShowname()
    const durationOk = controlDuration()
    controlDescription()
    controlLink()
    if (document.getElementById(ACTION_CREATE_SHOW)) {
      document.getElementById(ACTION_CREATE_SHOW).disabled = !(nameOk && durationOk)
    }
  })

  if (!display || !currentUser) {
    return null
  }

  const handleShowname = (event) => {
    setShowname(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleLink = (event) => {
    setLink(event.target.value)
  }
  const handleDuration = (event) => {
    try {
      let dura = parseInt(event.target.value)
      setDuration(dura)
    } catch (error) {
      // do nothing
    }
  }

  const clearFields = () => {
    setShowname('')
    document.getElementById(FLD_CRE_SET_SHO_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_CRE_SET_SHO_DES).value = ''
    setLink('')
    document.getElementById(FLD_CRE_SET_SHO_LNK).value = ''
    setDuration(0)
    document.getElementById(FLD_CRE_SET_SHO_DUR).value = 0
  }

  const handleCreateShowCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateShow = async (event) => {
    event.preventDefault()
    console.log('Create show', showname)
    if (showname.trim().length >= SHOWNAME_LENGTH && !isNaN(duration) && duration >= 0) {
      try {
        const eventId = unfinishedEvent.id
        const recurrenceId = unfinishedRecurrence.id
        const result = await createEventShow[0]({
          variables: { eventId, recurrenceId, showname, description, link, duration }
        })
        if (result) {
          const createdShow = result.data.createEventShow
          clearFields()
          addShowToOwnEvents(eventId, createdShow)
          console.log('Show was added:')
          displaySuccess(`New show created`)
        } else {
          displayError('Show was not created')
        }
        return null
      } catch (error) {
        console.log(error.message)
        displayError(error)
      }
    } else {
      displayInfo('Show name too short')
    }

  }

  return (
    <CreateEventShowForm
      showname={showname}
      handleShowname={handleShowname}
      handleDescription={handleDescription}
      handleLink={handleLink}
      handleDuration={handleDuration}
      handleCreateShowCancel={handleCreateShowCancel}
      handleCreateShow={handleCreateShow}
      handleDisplayShows={handleDisplayShows} />
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
  addShowToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventShow)