import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DateTime, Settings } from 'luxon'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { addEntryToOwnEvents } from '../../reducers/ownEventsReducer'

import { ACTION_CREATE_ENTRY } from '../../constants'
import { FLD_CRE_HNT_ENT_DAT, FLD_CRE_HNT_ENT_TIM, FLD_CRE_HNT_ENT_SHO, FLD_CRE_HNT_ENT_VEN } from '../../constants'
import { FLD_CRE_SET_ENT_DAT, FLD_CRE_SET_ENT_TIM, FLD_CRE_SET_ENT_SHO, FLD_CRE_SET_ENT_VEN } from '../../constants'

import CreateEventEntryForm from './CreateEventEntryForm'

const CreateEventEntry = (props) => {

  Settings.defaultLocale = 'fi'

  const { displaySuccess, displayInfo, displayError, currentUser, unfinishedEvent, unfinishedRecurrence,
    venues, shows, addEntryToOwnEvents, createEventEntry, display } = props

  const [show, setShow] = useState('')
  const [venue, setVenue] = useState('')
  const [showdate, setShowdate] = useState('')
  const [showtime, setShowtime] = useState('')

  const controlShow = () => {
    if (document.getElementById(FLD_CRE_HNT_ENT_SHO)) {
      if (show.trim() === '') {
        document.getElementById(FLD_CRE_HNT_ENT_SHO).innerHTML = 'Select show'
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_SHO).innerHTML = 'Show selected'
        return true
      }
    }
  }
  const controlVenue = () => {
    if (document.getElementById(FLD_CRE_HNT_ENT_VEN)) {
      if (venue.trim() === '') {
        document.getElementById(FLD_CRE_HNT_ENT_VEN).innerHTML = 'Select venue'
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_VEN).innerHTML = 'Venue selected'
      }
    }
    return
  }
  const controlShowdate = () => {
    if (document.getElementById(FLD_CRE_HNT_ENT_DAT)) {
      if (!isValidDate(showdate)) {
        document.getElementById(FLD_CRE_HNT_ENT_DAT).innerHTML = 'Set date as dd.mm.yyyy'
        return false
      } else {
        document.getElementById(FLD_CRE_HNT_ENT_DAT).innerHTML = 'Date is valid'
        return true
      }
    }
  }

  useEffect(() => {
    const showOk = controlShow()
    const venueOk = controlVenue()
    const dateOk = controlShowdate()
    if (document.getElementById(ACTION_CREATE_ENTRY)) {
      document.getElementById(ACTION_CREATE_ENTRY).disabled = !(showOk && venueOk && dateOk)
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
    setShow(event.target.value)
  }
  const handleVenue = (event) => {
    setVenue(event.target.value)
  }
  const handleShowdate = (event) => {
    try {
      let shodate = DateTime.fromFormat(event.target.value, 'd.L.yyyy').toJSDate()
      if (isValidDate(shodate)) {
        setShowdate(shodate)
      }
    } catch (error) {
      console.log("Error with date", event.target.value)
    }
  }

  const clearFields = () => {
    setShow('')
    document.getElementById(FLD_CRE_SET_ENT_SHO).value = ''
    setVenue('')
    document.getElementById(FLD_CRE_SET_ENT_VEN).value = ''
    setShowdate('')
    document.getElementById(FLD_CRE_SET_ENT_DAT).value = ''
  }

  const handleCreateEntryCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleCreateEntry = async (event) => {
    event.preventDefault()
    console.log('Create entry at ', showdate)
    if (show !== '' && venue !== '' && isValidDate(showdate)) {
      try {
        const eventId = unfinishedEvent.id
        const recurrenceId = unfinishedRecurrence.id
        const showdateint = (new Date(showdate)).toMillis()
        const result = await createEventEntry[0]({
          variables: { eventId, recurrenceId, venue, show, showdateint }
        })
        if (result) {
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
      displayInfo('Show, venue or date invalid')
    }

  }

  return (
    <CreateEventEntryForm
      showdate={showdate}
      handleShowdate={handleShowdate}
      handleVenue={handleVenue}
      handleShow={handleShow}
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