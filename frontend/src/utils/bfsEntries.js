import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = (entries, minShows, maxShows, minBreak, maxBreak, cutOffAfterMidnight) => {

  console.log ('Trying to make paths of', entries.length, 'entries')

  let results = {}
  results.paths = [] // All paths
  results.interruptedPaths = [] // Interrupted paths
  results.entryMap = new Map() // As keys each entry and as values count of show in paths
  results.entrySets = [] // Sets of all entries at each path slot

  if (!entries || entries.length === 0) {
    return results
  }

  let shows = 0
  while (shows < maxShows) {
    results.entrySets.push(new Set())
    shows++
  }

  // We're relying on the shows being in ascending order by showtime

  // First add all starting nodes to the "queue" (We're actually using an array like a queue)
  let workingPaths = []
  const firstStartTime = parseISO(entries[0].showtime)
  entries.some((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(firstStartTime, nextStartTime) === 0) {
      // All shows as paths starting at the same time as the first show on the list are added
      let path = []
      let newEntry = {...entry}
      newEntry.ind = index // Mark entry with the index of its place in the orginal list. More of that later.
      path.push(newEntry)
      workingPaths.push(path)
      return false
    }
    return true
  })

  // Then we start going through the "queue" of paths (Array of arrays)
  let flush = false
  while (workingPaths.length) {
    let thisPath = workingPaths.shift()
    if (thisPath.length >= maxShows) {
      // Add to ready list if number of maximum shows is reached
      results.paths.push(thisPath)
      thisPath.forEach((entry, index) => {
        if (results.entryMap.has(entry)) {
          results.entryMap.set(entry, (results.entryMap.get(entry) + 1))
        } else {
          results.entryMap.set(entry, 1)
        }
        results.entrySets[index].add(entry)
      })
    } else if (flush) {
      results.interruptedPaths.push(thisPath)
    } else { 
      let lastEntry = thisPath[(thisPath.length - 1)]
      // Take the last show of this path to know when it ends
      let thisStartTime = parseISO(lastEntry.showtime)
      let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
      let first = true // So we know to add tomorrows first show(s) or not
      let timeOfFirst = null
      let didAddToWorking = false // So we know if we should add paths long enough to ready list
      for (let e = lastEntry.ind + 1; e < entries.length; e++) {
        // Now take the next from the original list. We use the added ind of entry
        // so we know where it was int the orginal list and don't have to go through
        // the list from the beginning.
        let nextEntry = entries[e]
        nextEntry.ind = e
        if (nextEntry.id !== lastEntry.id) {
          // Don't add start node again (if we made a mistake)
          let nextStartTime = parseISO(nextEntry.showtime)
          const tooSoon = compareAsc(nextStartTime, addMinutes(thisEndTime, minBreak)) < 1
          const tooLate = compareAsc(addMinutes(thisEndTime, maxBreak), nextStartTime) < 1
          let nextDaysFirsts = false
          const laterDate = compareAsc(addMinutes(endOfDay(thisEndTime), cutOffAfterMidnight), nextStartTime) < 1
          if ((laterDate)) {
            // In case the path extends to the next day we'll pick
            // - the first show and
            // - all other shows that start at the same time
            if (first) {
              first = false
              timeOfFirst = nextStartTime
            }
            nextDaysFirsts = compareAsc(timeOfFirst, nextStartTime) === 0
          }
          if ((!tooSoon && !tooLate) || (nextDaysFirsts)) {
            // We're only adding a show to the path if it
            // - doesn't start before the previous ends + marginal and doesn't leave a gap too long
            // - or we have encountered the first show(s) of the next day
            first = false
            didAddToWorking = true // A longer path was found, don't add this to ready list
            const newPath = thisPath.slice(0)
            newPath.push(nextEntry)
            workingPaths.push(newPath)
          }
        }
      }
      if (!didAddToWorking && (thisPath.length >= minShows)) {
        // If the path is long enough and we didn't find longer paths
        results.paths.push(thisPath)
      }
    }
    if (!flush && workingPaths.length > 512) {
      // Contingency plan to stop algo from running too long. Have to find a good limit.
      flush = true
    }
  }

  return results

}