import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { parseISO, compareAsc, addMinutes } from 'date-fns'

import { Container, Row, Col } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'
import { GET_AVAILABLE_EVENTS } from '../event/gqls'

import { displayError } from '../../reducers/notificationReducer'
import { setAvailableEvents } from '../../reducers/availableEventsReducer'

import { extractAvailableEntries, pruneEntries } from '../../utils/pruneEntries'

import PlanEvents from './PlanEvents'
import PlanEventRecurrences from './PlanEventRecurrences'
import PlanSelectDatesForm from './PlanSelectDatesForm'
import PlanSelectShowCountForm from './PlanSelectShowCountForm'
import PlanPaths from './PlanPaths'
import PlanRejectedEntries from './PlanRejectedEntries'

const Plan = (props) => {

  const { displayError, currentUser, availableEvents, setAvailableEvents } = props

  const [eventId, setEventId] = useState(null) // Here we are usind ids not objects
  const [displayEvents, setDisplayEvents] = useState(true)
  const [recurrenceId, setRecurrenceId] = useState(null) // Here we are usind ids not objects
  const [displayRecurrences, setDisplayRecurrences] = useState(true)
  const [minShows, setMinShows] = useState(1)
  const [maxShows, setMaxShows] = useState(5) // What would be default max?
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [availableEntries, setAvailableEntries] = useState({})
  const [availableStats, setAvailableStats] = useState('No available events')
  const [prunedEntries, setPrunedEntries] = useState({})
  const [prunedStats, setPrunedStats] = useState('Nothing to prune')
  const [rejectedEntries, setRejectedEntries] = useState(new Set())

  const handleError = (error) => {
    displayError(error)
  }
  const handleDisplayEvents = () => {
    setDisplayEvents(!displayEvents)
  }
  const handleDisplayRecurrences = () => {
    setDisplayRecurrences(!displayRecurrences)
  }
  const getAvailableEvents = useMutation(GET_AVAILABLE_EVENTS, {
    onError: handleError,
    options: { fetchPolicy: 'network-only' }
  })

  let username = null

  const handleGetAvailableEvents = async () => {
    try {
      const eventsResult = await getAvailableEvents[0]({
        variables: { username }
      })
      if (eventsResult.data) {
        console.log('Ava:', eventsResult.data.getAvailableEvents)
        setAvailableEvents(eventsResult.data.getAvailableEvents)
      }
    } catch (error) {
      console.log('Couldnt get available events', error.message)
      displayError('Something went wrong fetching available events')
    }
  }
  
  // This is duplicate code from last useEffect should use some
  // useCallback to be able to use from useEffect
  const handlePruneEntries = () => {
    if (availableEntries.entries && startTime && endTime) {
      console.log('Should be able to prune available entries')
      let results = pruneEntries(availableEntries.entries, startTime, endTime, rejectedEntries)
      const prunedEntriesCount = results.entries.length
      const prunedShowsCount = results.shows.size
      setPrunedStats( 
        `Pruned ${prunedEntriesCount} (${prunedShowsCount} distinct) shows with the criteria.`)
      setPrunedEntries(results)
    }
  }
  
  const handleRejectEntry = (rejected) => {
    console.log('Rejecting', rejected.showname, '@', rejected.showtime)
    let newRejected = rejectedEntries.add(rejected)
    setRejectedEntries(newRejected)
    console.log(rejectedEntries)
    handlePruneEntries()
  }
  const handleUnrejectEntry = (rejected) => {
    setRejectedEntries(rejectedEntries.delete(rejected))
  }

  useEffect(() => {
    console.log('Using effect to get available events')
    handleGetAvailableEvents()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    console.log('Using effect to extract available events')

    if (availableEvents && eventId && recurrenceId) {
      console.log('Should be able to extract available entries')
      let results = extractAvailableEntries(availableEvents, eventId, recurrenceId)
      const availableEntriesCount = results.entries.length
      const availableShowsCount = results.shows.length
      setAvailableStats( 
        `Total of ${availableEntriesCount} (${availableShowsCount} distinct) shows in the event schedule`)
      setAvailableEntries(results)
    }

  }, [availableEvents, eventId, recurrenceId])

  useEffect(() => {

    console.log('Using effect to prune available events')
    //handlePruneEntries()
    if (availableEntries.entries && startTime && endTime) {
      console.log('Should be able to prune available entries')
      let results = pruneEntries(availableEntries.entries, startTime, endTime, rejectedEntries)
      const prunedEntriesCount = results.entries.length
      const prunedShowsCount = results.shows.size
      setPrunedStats( 
        `Pruned ${prunedEntriesCount} (${prunedShowsCount} distinct) shows with the criteria.`)
      setPrunedEntries(results)
    }


  }, [availableEntries, startTime, endTime, rejectedEntries])//, handlePruneEntries])

  if ((getAvailableEvents[1]).loading) {
    return (
      <Container>
      <Row>
        <Col className="Component-title">
          Create a new plan
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col>
          <span>Loading events to prune...</span>
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      </Container>
    )
  }

  /*
  function pruneStartTime(entry) {
    return (compareAsc(startTime, parseISO(entry.showtime)) < 1)
  }
  function pruneEndTime(entry) {
    return (compareAsc(addMinutes(parseISO(entry.showtime), entry.show.duration), endTime) < 1 )
  }

  const selectedEvent = availableEvents.find(event => event.id === eventId)
  let firstEntry = null
  let lastEndingEntry = null
  let availableEntries = []
  let prunedEntries = []
  let distinctCount = 0
  let prunedCount = 0
  let prunedDistinct = new Set()
  if (selectedEvent) {
    const selectedRecurrence = selectedEvent.recurrences.find(recurrence => recurrence.id === recurrenceId)
    if (selectedRecurrence) {
      availableEntries = selectedRecurrence.entries.filter((entry) => {
        if (lastEndingEntry === null) {
          lastEndingEntry = entry
        } else {
          if (compareAsc(
            addMinutes(parseISO(lastEndingEntry.showtime), lastEndingEntry.show.duration),
            addMinutes(parseISO(entry.showtime), entry.show.duration)) < 1) {
              lastEndingEntry = entry
          }
        }
        return entry.recurrence === recurrenceId
      })
      firstEntry = availableEntries[0]
      distinctCount = selectedRecurrence.shows.length
      prunedEntries = availableEntries.filter((entry) => {
        return pruneStartTime(entry) && pruneEndTime(entry)
      })
      prunedCount = prunedEntries.length
      let dist = {}
      prunedDistinct = prunedEntries.filter((entry) => {
        if (dist[entry.show.id]) {
          return false
        }
        dist[entry.show.id] = true
        return true
      })
    }
  }
  */

  console.log('Pruned:', prunedEntries)

  return (
    <Container>
      <Row>
        <Col className="Component-title">
          Create a new plan
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col>
          {(!availableEvents || availableEvents === null || availableEvents.length === 0) ? (
            <span>There seem to be no available events.</span>
          ) : (
            <PlanEvents displayEvents={displayEvents} handleDisplayEvents={handleDisplayEvents}
              eventId={eventId} setEventId={setEventId} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {(eventId &&
            <PlanEventRecurrences eventId={eventId} recurrenceId={recurrenceId}
              setRecurrenceId={setRecurrenceId} displayRecurrences={displayRecurrences}
              handleDisplayrecurrences={handleDisplayRecurrences} />
          )}
        </Col>
      </Row>
        {(eventId && recurrenceId && availableEntries && availableEntries.entries &&
        <>
          <Row>
            <Col>
              <PlanSelectShowCountForm totalShows={availableEntries.entries.length}
                minShows={minShows} setMinShows={setMinShows}
                maxShows={maxShows} setMaxShows={setMaxShows} />
            </Col>
          </Row>
          <Row>
            <Col>
              <PlanSelectDatesForm firstEntry={availableEntries.firstEntry}
                lastEntry={availableEntries.lastEndingEntry}
                startTime={startTime} setStartTime={setStartTime}
                endTime={endTime} setEndTime={setEndTime} />
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
          <Row className="Content-small">
            <Col><span>&nbsp;</span></Col>
            <Col><span>{prunedStats}</span></Col>
            <Col><span>{availableStats}</span></Col>
          </Row>
        </>
        )}
      <Row>
        <Col>
          <PlanRejectedEntries rejectedEntries={rejectedEntries} handleRejectEntry={handleRejectEntry}
            handleUnrejectEntry={handleUnrejectEntry} />
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col>
          {(prunedEntries && prunedEntries.entries && prunedEntries.entries.length > 0 &&
          <PlanPaths prunedEntries={prunedEntries.entries} minShows={minShows} maxShows={maxShows}
            handleRejectEntry={handleRejectEntry} />)}
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displayError,
  setAvailableEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)