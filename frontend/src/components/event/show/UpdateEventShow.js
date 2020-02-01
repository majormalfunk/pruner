import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'
import { updateShowInOwnEvents, removeShowFromOwnEvents } from '../../../reducers/ownEventsReducer'

import { SHOWNAME_LENGTH } from '../../../constants'
import { ACTION_UPDATE_SHOW } from '../../../constants'
import { FLD_UPD_HNT_SHO_DES, FLD_UPD_HNT_SHO_NAM, FLD_UPD_HNT_SHO_LNK, FLD_UPD_HNT_SHO_DUR } from '../../../constants'
import { FLD_UPD_SET_SHO_DES, FLD_UPD_SET_SHO_NAM, FLD_UPD_SET_SHO_LNK, FLD_UPD_SET_SHO_DUR } from '../../../constants'
import UpdateEventShowForm from './UpdateEventShowForm'

const UpdateEventShow = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser,
    updateShowInOwnEvents, removeShowFromOwnEvents,
    updateEventShow, deleteEventShow, unfinishedShow, setSelectedShow } = props

  const [showname, setShowname] = useState(unfinishedShow.showname)
  const [description, setDescription] = useState(unfinishedShow.description)
  const [link, setLink] = useState(unfinishedShow.link)
  const [duration, setDuration] = useState(unfinishedShow.duration)

  const controlShowname = () => {
    if (document.getElementById(FLD_UPD_HNT_SHO_NAM)) {
      if (showname.trim() === '') {
        document.getElementById(FLD_UPD_HNT_SHO_NAM).innerHTML = 'Enter show name'
        return false
      } else if (showname.trim().length < SHOWNAME_LENGTH) {
        document.getElementById(FLD_UPD_HNT_SHO_NAM).innerHTML = `Show name must be at least ${SHOWNAME_LENGTH} characters`
        return false
      } else {
        document.getElementById(FLD_UPD_HNT_SHO_NAM).innerHTML = 'Show name is long enough'
        return true
      }
    }
  }
  const controlDescription = () => {
    if (document.getElementById(FLD_UPD_HNT_SHO_DES)) {
      if (description.trim() === '') {
        document.getElementById(FLD_UPD_HNT_SHO_DES).innerHTML = 'You should give a short description of the show'
      } else {
        document.getElementById(FLD_UPD_HNT_SHO_DES).innerHTML = 'Planners will see this description'
      }
    }
    return
  }
  const controlLink = () => {
    if (document.getElementById(FLD_UPD_HNT_SHO_LNK)) {
      if (link.trim() === '') {
        document.getElementById(FLD_UPD_HNT_SHO_LNK).innerHTML = 'You can provide a link for the show'
      } else {
        document.getElementById(FLD_UPD_HNT_SHO_LNK).innerHTML = 'Planners will see this link'
      }
    }
    return
  }
  const controlDuration = () => {
    if (isNaN(duration)) {
      document.getElementById(FLD_UPD_HNT_SHO_DUR).innerHTML = `Show duration should be a number`
      return false
    }
    if (document.getElementById(FLD_UPD_HNT_SHO_DUR)) {
      if (duration < 0) {
        document.getElementById(FLD_UPD_HNT_SHO_DUR).innerHTML = 'Show´s duration can´t be negative'
        return false
      } else if (duration === 0) {
        document.getElementById(FLD_UPD_HNT_SHO_DUR).innerHTML = 'Are you sure the show takes less than a minute?'
        return true
      } else {
        document.getElementById(FLD_UPD_HNT_SHO_DUR).innerHTML = `Show duration is ${duration} minutes`
        return true
      }
    }
  }

  useEffect(() => {
    const nameOk = controlShowname()
    const durationOk = controlDuration()
    controlDescription()
    controlLink()
    if (document.getElementById(ACTION_UPDATE_SHOW)) {
      document.getElementById(ACTION_UPDATE_SHOW).disabled = !(nameOk && durationOk)
    }
  })

  if (!currentUser) {
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
    document.getElementById(FLD_UPD_SET_SHO_NAM).value = ''
    setDescription('')
    document.getElementById(FLD_UPD_SET_SHO_DES).value = ''
    setLink('')
    document.getElementById(FLD_UPD_SET_SHO_LNK).value = ''
    setDuration(0)
    document.getElementById(FLD_UPD_SET_SHO_DUR).value = 0
  }

  const revertFields = () => {
    setShowname(unfinishedShow.showname)
    document.getElementById(FLD_UPD_SET_SHO_NAM).value = unfinishedShow.showname
    setDescription(unfinishedShow.description)
    document.getElementById(FLD_UPD_SET_SHO_DES).value = unfinishedShow.description
    setLink(unfinishedShow.link)
    document.getElementById(FLD_UPD_SET_SHO_LNK).value = unfinishedShow.link
    setDuration(unfinishedShow.duration)
    document.getElementById(FLD_UPD_SET_SHO_DUR).value = unfinishedShow.duration
  }

  const handleUpdateShowCancel = (event) => {
    event.preventDefault()
    revertFields()
    setSelectedShow(null)
  }

  const handleUpdateShow = async (event) => {
    event.preventDefault()
    //console.log('Update show to', showname)
    if (showname.trim().length >= SHOWNAME_LENGTH && !isNaN(duration) && duration >= 0) {
      try {
        const id = unfinishedShow.id
        const result = await updateEventShow[0]({
          variables: { id, showname, description, link, duration }
        })
        //console.log('Result:', result)
        if (result) {
          const updatedShow = result.data.updateEventShow
          const eventId = unfinishedShow.event
          setSelectedShow(null)
          updateShowInOwnEvents(eventId, updatedShow)
          displaySuccess('Show info was updated')
        } else {
          displayError('Show info was not updated')
        }
        return null
      } catch (error) {
        displayError('Error trying to update event show')
        throw error
      }
    } else {
      displayInfo('Show name too short or false duration')
    }
  }

  const handleDeleteShow = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete show ${showname}?`)) {
      try {
        const id = unfinishedShow.id
        console.log('Show id is', id)
        const result = await deleteEventShow[0]({
          variables: { id }
        })
        if (result) {
          if(result.data.deleteEventShow && result.data.deleteEventShow === 1) {
            const eventId = unfinishedShow.event
            try {
              clearFields()
              setSelectedShow(null)
              removeShowFromOwnEvents(eventId, id)
              displaySuccess('Show deleted')
              console.log('Show deleted')
            } catch (error) {
              console.log('Something wrong:', error)
            }
          }
        } else {
          displayError('Show was not deleted')
        }
        return null
      } catch (error) {
        console.log('Error trying to delete event show')
        //revertFields()
        displayError('Error trying to delete event show')
      }
    } else {
      displayInfo('Show deletion was cancelled')
    }
  }

  return (
    <UpdateEventShowForm
      showname={showname}
      handleShowname={handleShowname}
      description={description}
      handleDescription={handleDescription}
      link={link}
      handleLink={handleLink}
      duration={duration}
      handleDuration={handleDuration}
      handleUpdateShowCancel={handleUpdateShowCancel}
      handleUpdateShow={handleUpdateShow}
      handleDeleteShow={handleDeleteShow} />
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
  updateShowInOwnEvents,
  removeShowFromOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventShow)