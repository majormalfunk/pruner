import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const pruneEntries = (availableEvents, eventId, recurrenceId, startTime, endTime) => {

  console.log ('Trying to prune entries from', availableEvents.length, 'available events')

  function pruneStartTime(entry) {
    return (compareAsc(startTime, parseISO(entry.showtime)) < 1)
  }
  function pruneEndTime(entry) {
    return (compareAsc(addMinutes(parseISO(entry.showtime), entry.show.duration), endTime) < 1 )
  }

  let results = {}
  results.availableEntries = [] // Available entries in this event's this recurrence
  results.availableShows = [] // Availlable distinct shows in this event's this recurrence
  results.prunedEntries = [] // A reduced list after this pruning
  results.prunedShows = new Set() // A reduced set of distinct shows after this pruning
  results.firstEntry = null
  results.lastEndingEntry = null

  if (!availableEvents || availableEvents.length === 0) {
    return results
  }

  const selectedEvent = availableEvents.find(event => event.id === eventId)
  let lastEndingEntry = null
  let availableEntries = []
  if (selectedEvent) {
    const selectedRecurrence = selectedEvent.recurrences.find(recurrence => recurrence.id === recurrenceId)
    if (selectedRecurrence) {
      results.availableShows = selectedRecurrence.shows
      availableEntries = selectedRecurrence.entries.filter((entry) => {
        if (results.lastEndingEntry === null) {
          results.lastEndingEntry = entry
        } else {
          if (compareAsc(
            addMinutes(parseISO(lastEndingEntry.showtime), lastEndingEntry.show.duration),
            addMinutes(parseISO(entry.showtime), entry.show.duration)) < 1) {
              results.lastEndingEntry = entry
          }
        }
        return entry.recurrence === recurrenceId
      })
      results.firstEntry = availableEntries[0]
      results.availableCount = availableEntries.length
      results.prunedEntries = availableEntries.filter((entry) => {
        const inTimeSlot = (pruneStartTime(entry) && pruneEndTime(entry))
        // More conditions here
        if (inTimeSlot) {
          results.prunedShows.add(entry.show)
          return true
        }
        return false
      })
    }
  }

  return results

}