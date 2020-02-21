import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const extractAvailableEntries = (availableEvents, eventId, recurrenceId) => {

  let results = {}
  results.entries = [] // Available entries in this event's this recurrence
  results.shows = [] // Available distinct shows in this event's this recurrence
  results.venues = [] // Available venues in this event's this recurrence
  results.firstEntry = null
  results.lastEndingEntry = null

  if (!availableEvents || availableEvents.length === 0) {
    return results
  }

  const selectedEvent = availableEvents.find(event => event.id === eventId)
  let entries = []
  if (selectedEvent) {
    const selectedRecurrence = selectedEvent.recurrences.find(recurrence => recurrence.id === recurrenceId)
    if (selectedRecurrence) {
      results.shows = selectedRecurrence.shows
      results.venues = selectedRecurrence.venues
      results.entries = selectedRecurrence.entries.filter((entry) => {
        if (results.lastEndingEntry === null) {
          results.lastEndingEntry = entry
        } else {
          if (compareAsc(
            addMinutes(parseISO(results.lastEndingEntry.showtime), results.lastEndingEntry.show.duration),
            addMinutes(parseISO(entry.showtime), entry.show.duration)) < 1) {
              results.lastEndingEntry = entry
          }
        }
        return entry.recurrence === recurrenceId
      })
      results.firstEntry = results.entries[0]
    }
  }

  return results
}

export const pruneEntries = (availableEntries, startTime, endTime, rejectedEntryIds) => {

  console.log('Trying to prune entries from', availableEntries.length, 'available entries')
  console.log('Rejected entries count is', rejectedEntryIds.size)

  function pruneStartTime(entry) {
    return (compareAsc(startTime, parseISO(entry.showtime)) < 1)
  }
  function pruneEndTime(entry) {
    return (compareAsc(addMinutes(parseISO(entry.showtime), entry.show.duration), endTime) < 1 )
  }

  let results = {}
  results.entries = [] // A list of entries after this pruning
  results.rejected = [] // A list of rejected entries after this pruning
  results.shows = new Map() // A reduced set (map) of distinct shows after this pruning
  results.venues = new Map() // A reduced set (map) of distinct venues after this pruning

  if (!availableEntries || availableEntries.length === 0) {
    return results
  }

  availableEntries.forEach((entry) => {
    if (pruneStartTime(entry) && pruneEndTime(entry)) {
      if (rejectedEntryIds.has(entry.id)) {
        results.rejected.push(entry)
      } else {
        results.entries.push(entry)
        results.shows.set(entry.show.id, entry.show)
        results.venues.set(entry.venue.id, entry.venue)
      }
    }
  })

  return results

}