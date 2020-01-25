import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Settings } from 'luxon'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { addEntryToOwnEvents } from '../../reducers/ownEventsReducer'

import { ACTION_CREATE_ENTRY } from '../../constants'
import { FLD_CRE_HNT_ENT_TIM, FLD_CRE_HNT_ENT_SHO, FLD_CRE_HNT_ENT_VEN } from '../../constants'
import { FLD_CRE_SET_ENT_TIM, FLD_CRE_SET_ENT_SHO, FLD_CRE_SET_ENT_VEN } from '../../constants'

import CreateEventEntryForm from './CreateEventEntryForm'

const CreateEventEntry = (props) => {

  Settings.defaultLocale = 'fi'

  const { displaySuccess, displayInfo, displayError, currentUser,
    unfinishedEvent, unfinishedRecurrence, venues, shows,
    addEntryToOwnEvents, createEventEntry, display } = props

  const [show, setShow] = useState('')
  const [venue, setVenue] = useState('')
  const [showtime, setShowtime] = useState(null)

  const controlShow = () => {
    if (!shows || shows === null || shows.length === 0) {
      document.getElementById(FLD_CRE_HNT_ENT_SHO).innerHTML = 'At least 1 show needed to create entry'
      return false
    }
    if (document.getElementById(FLD_CRE_HNT_ENT_SHO)) {
      if (show.trim() === '') {
        document.getElementById(FLD_CRE_HNT_ENT_SHO).innerHTML = 'Select show'
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_SHO).innerHTML = 'Show selected'
        return true
      }
    }
    return false
  }
  const controlVenue = () => {
    if (!venues || venues === null || venues.length === 0) {
      document.getElementById(FLD_CRE_HNT_ENT_VEN).innerHTML = 'At least 1 venue needed to create entry'
      return false
    }
    if (document.getElementById(FLD_CRE_HNT_ENT_VEN)) {
      if (venue.trim() === '') {
        document.getElementById(FLD_CRE_HNT_ENT_VEN).innerHTML = 'Select venue'
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_VEN).innerHTML = 'Venue selected'
        return true
      }
    }
    return false
  }
  const controlShowtime = () => {
    if (document.getElementById(FLD_CRE_HNT_ENT_TIM)) {
      if (!isValidDate(showtime)) {
        document.getElementById(FLD_CRE_HNT_ENT_TIM).innerHTML = 'Select date'
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_TIM).innerHTML = `Selected date is ${showtime.toLocaleDateString()}`
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const showOk = controlShow()
    const venueOk = controlVenue()
    const timeOk = controlShowtime()
    if (document.getElementById(ACTION_CREATE_ENTRY)) {
      document.getElementById(ACTION_CREATE_ENTRY).disabled = !(showOk && venueOk && timeOk)
    }
  })

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  if (!display || !currentUser) {
    return null
  }
  if (!venues || venues === null || venues.length === 0) {
    return null
  }
  if (!shows || shows === null || shows.length === 0) {
    return null
  }

  const handleShow = (event) => {
    console.log('Selected show:', event.target.value)
    setShow(event.target.value)
  }
  const handleVenue = (event) => {
    console.log('Selected venue:', event.target.value)
    setVenue(event.target.value)
  }
  const handleShowtime = (event) => {
    try {
      if (isValidDate(event)) {
        setShowtime(event)
        console.log('Selected showtime:', event)
      } else {
        console.log(event, 'was not a valid showtime')
      }
    } catch (error) {
      console.log("Error with showtime", event)
      console.log(error)
    }
  }

  const clearFields = () => {
    setShow('')
    document.getElementById(FLD_CRE_SET_ENT_SHO).selectedIndex = '-1'
    setVenue('')
    document.getElementById(FLD_CRE_SET_ENT_VEN).selectedIndex = '-1'
    setShowtime(null)
    document.getElementById(FLD_CRE_SET_ENT_TIM).value = ''
  }

  const handleCreateEntryCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateEntry = async (event) => {
    event.preventDefault()
    console.log('Create entry at', showtime)
    if (show !== '' && venue !== '' && isValidDate(showtime)) {
      try {
        console.log('Trying')
        console.log('Event:', unfinishedEvent)
        console.log('Recurrence:', unfinishedRecurrence)
        const eventId = unfinishedEvent.id
        const recurrenceId = unfinishedRecurrence.id
        const showtimeint = showtime.getTime()
        console.log('Parameters ready')
        const result = await createEventEntry[0]({
          variables: { eventId, recurrenceId, venue, show, showtimeint }
        })
        if (result) {
          //console.log('Got result')
          const createdEntry = result.data.createEventEntry
          clearFields()
          addEntryToOwnEvents(eventId, createdEntry)
          console.log('Entry was added:')
          displaySuccess(`New entry created`)
        } else {
          displayError('Entry was not created')
        }
        return null
      } catch (error) {
        console.log(error.message)
        displayError(error)
      }
    } else {
      displayInfo('Show, venue or showtime invalid')
    }
  }

  return (
    <CreateEventEntryForm
      showtime={showtime}
      handleShowtime={handleShowtime}
      handleVenue={handleVenue}
      venues={venues}
      handleShow={handleShow}
      shows={shows}
      handleCreateEntryCancel={handleCreateEntryCancel}
      handleCreateEntry={handleCreateEntry} />
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
  addEntryToOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventEntry)