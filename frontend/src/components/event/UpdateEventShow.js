import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateShowInOwnEvents, removeShowFromOwnEvents } from '../../reducers/ownEventsReducer'

import { SHOWNAME_LENGTH } from '../../constants'
import { ACTION_UPDATE_SHOW } from '../../constants'
import UpdateEventShowForm from './UpdateEventShowForm'

const UpdateEventShow = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, display,
    updateShowInOwnEvents, removeShowFromOwnEvents,
    updateEventShow, deleteEventShow, unfinishedShow, setSelectedShow } = props

  const [showname, setShowname] = useState(unfinishedShow.showname)
  const [description, setDescription] = useState(unfinishedShow.description)
  const [link, setLink] = useState(unfinishedShow.link)
  const [duration, setDuration] = useState(unfinishedShow.duration)

  const controlShowname = () => {
    if (showname) {
      if (document.getElementById(`shownamehintupdate`)) {
        if (showname.trim() === '') {
          document.getElementById(`shownamehintupdate`).innerHTML = 'Enter show name'
          return false
        } else if (showname.trim().length < SHOWNAME_LENGTH) {
          document.getElementById(`shownamehintupdate`).innerHTML = `Show name must be at least ${SHOWNAME_LENGTH} characters`
          return false
        } else {
          document.getElementById(`shownamehintupdate`).innerHTML = 'Show name is long enough'
          return true
        }
      }
    }
  }
  const controlDescription = () => {
    if (description) {
      if (document.getElementById(`showdescriptionhintupdate`)) {
        if (description.trim() === '') {
          document.getElementById(`showdescriptionhintupdate`).innerHTML = 'You should give a short description of the show'
        } else {
          document.getElementById(`showdescriptionhintupdate`).innerHTML = 'Planners will see this description'
        }
      }
      return
    }
  }
  const controlLink = () => {
    if (link) {
      if (document.getElementById(`showlinkhintupdate`)) {
        if (description.trim() === '') {
          document.getElementById(`showlinkhintupdate`).innerHTML = 'You can provide a link for the show'
        } else {
          document.getElementById(`showlinkhintupdate`).innerHTML = 'Planners will see this link'
        }
      }
      return
    }
  }
  const controlDuration = () => {
    if (duration) {
      if (isNaN(duration)) {
        return false
      }
      if (document.getElementById(`showdurationhintupdate`)) {
        if (duration < 0) {
          document.getElementById(`showdurationhintupdate`).innerHTML = 'Show´s duration can´t be negative'
          return false
        } else if (duration === 0) {
          document.getElementById(`showdurationhintupdate`).innerHTML = 'Are you sure the show takes less than a minute?'
          return true
        } else {
          document.getElementById(`showdurationhintupdate`).innerHTML = `Show duration is ${duration} minutes`
          return true
        }
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
    document.getElementById(`setshownameupdate`).value = ''
    setDescription('')
    document.getElementById(`setshowdescriptionupdate`).value = ''
    setLink('')
    document.getElementById(`setshowlinkupdate`).value = ''
    setDuration(0)
    document.getElementById(`setshowdurationupdate`).value = 0
  }

  const revertFields = () => {
    setShowname(unfinishedShow.showname)
    document.getElementById(`setshownameupdate`).value = unfinishedShow.showname
    setDescription(unfinishedShow.description)
    document.getElementById(`setshowdescriptionupdate`).value = unfinishedShow.description
    setLink(unfinishedShow.link)
    document.getElementById(`setshowlinkupdate`).value = unfinishedShow.link
    setDuration(unfinishedShow.duration)
    document.getElementById(`setshowdurationupdate`).value = unfinishedShow.duration
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