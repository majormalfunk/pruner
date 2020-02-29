import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = (prunedEntries, minShows, maxShows, minGap, maxGap, favoritedEntryIds, cutOffAfterMidnight) => {

  const MAX_PATHS = 2048

  //console.log ('Trying to make paths of', prunedEntries.entries.length, 'entries')

  let results = {}
  results.paths = [] // All paths (Full and interrupted)
  results.fullPaths = 0 // Count of full paths
  results.interruptedPaths = 0 // Count of interrupted paths
  results.entryMap = new Map() // As keys entry ids and as values the entries
  results.venues = new Map() // Map of distinct venues of these paths

  if (!prunedEntries.entries || prunedEntries.entries.length === 0) {
    return results
  }

  function addToVenues(thisPath) {
    thisPath.forEach((entry) => {
      results.venues.set(entry.venue.id, entry.venue)
    })
  }
  function addToEntryMap(thisPath) {
    thisPath.forEach((entry) => {
      results.entryMap.set(entry.id, entry)
    })
  }

  // We're relying on the shows being in ascending order by showtime

  // First add all starting nodes to the "queue" (We're actually using an array like a queue)
  let intermediatePaths = []
  let workingPaths = []
  let favoritedEntries = []
  const firstStartTime = parseISO(prunedEntries.entries[0].showtime)
  const firstEndTime = addMinutes(firstStartTime, prunedEntries.entries[0].show.duration)
  prunedEntries.entries.forEach((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(nextStartTime, firstEndTime) <= 0) {
      // All shows as paths starting before the first show on the list ends are added
      let path = []
      let newEntry = {...entry}
      newEntry.ind = index // Mark entry with the index of its place in the orginal list. More of that later.
      path.push(newEntry)
      intermediatePaths.push(path)
    }
    if (favoritedEntryIds.has(entry.id)) {
      favoritedEntries.push(entry)
    }
  })

  let firstRound = true // We need to do this thing at least once
  let lastRound = true // Or at least twice if we do have favorites
  while (favoritedEntries.length || firstRound || lastRound) { // And we'll do it as many times as there are favorites + 1
    firstRound = false
    let favoriteEntry = null
    let favoriteStartTime = null
    if (favoritedEntries.length) {
      favoriteEntry = favoritedEntries.shift()
      favoriteStartTime = parseISO(favoriteEntry.showtime)
    } else {
      lastRound = false
    }
    let flush = false
    while (intermediatePaths.length) {
    // We use the intermediste paths to run the bfs between each favorited entries
    let path = intermediatePaths.shift()
      workingPaths.push(path)
    }
    // Then we start going through the "queue" of paths (Array of arrays)
    while (workingPaths.length) {
      let thisPath = workingPaths.shift()
      // console.log('Took from working paths', thisPath)
      let lastEntry = thisPath[(thisPath.length - 1)]
      if (thisPath.length >= maxShows) {
        // Add to ready list if number of maximum shows is reached
        results.fullPaths += thisPath.length
        results.paths.push(thisPath)
        addToVenues(thisPath)
        addToEntryMap(thisPath)
      } else if (flush) {
        results.interruptedPaths += thisPath.length
        results.paths.push(thisPath)
        addToVenues(thisPath)
        addToEntryMap(thisPath)
      } else if (favoriteEntry && favoriteEntry.id === lastEntry.id) {
        const newPath = thisPath.slice(0)
        intermediatePaths.push(newPath)
      } else {
        // Take the last show of this path to know when it ends
        let thisStartTime = parseISO(lastEntry.showtime)
        let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
        let first = true // So we know to add tomorrows first show(s) or not
        let nextDayFirstEnd = null
        let didAddToWorking = false // So we know if we should add paths long enough to ready list
        let nextIsFavorite = false
        for (let e = lastEntry.ind + 1; e < prunedEntries.entries.length; e++) {
          // Now take the next from the original list. We use the added ind of entry
          // so we know where it was in the orginal list and don't have to go through
          // the list from the beginning.
          let nextEntry = prunedEntries.entries[e]
          nextEntry.ind = e
          if (nextEntry.id !== lastEntry.id) {
            // Don't add start node again (if we made a mistake)
            const nextStartTime = parseISO(nextEntry.showtime)
            const tooSoon = compareAsc(nextStartTime, addMinutes(thisEndTime, minGap)) < 1
            const tooLate = compareAsc(addMinutes(thisEndTime, maxGap), nextStartTime) < 1
            let nextDaysFirsts = false
            const laterDate = compareAsc(addMinutes(endOfDay(thisEndTime), cutOffAfterMidnight), nextStartTime) < 1
            if ((laterDate)) {
              // In case the path extends to the next day we'll pick
              // - the first show and
              // - all other shows that start at the same time or during the first show
              if (first) {
                first = false
                nextDayFirstEnd = addMinutes(nextStartTime, nextEntry.show.duration)
              }
              nextDaysFirsts = compareAsc(nextStartTime, nextDayFirstEnd) <= 0
            }
            const skipsFavorite = (favoriteEntry ? compareAsc(favoriteStartTime, nextStartTime) < 1 : false)
            nextIsFavorite = (favoriteEntry ? favoriteEntry.id === nextEntry.id : false)
            if (nextIsFavorite && ((!tooSoon && !tooLate) || (nextDaysFirsts))) {
              // We want to avoid paths that skip favorites (e.g. when favorite fits in max gap)
              const newPath = thisPath.slice(0)
              newPath.push(nextEntry)
              intermediatePaths.push(newPath)
              break
            }
            if ((!skipsFavorite) && ((!tooSoon && !tooLate) || (nextDaysFirsts))) {
              // We're only adding a show to the path if it
              // - doesn't start before the previous ends + marginal and doesn't leave a gap too long
              // - or we have encountered the first show(s) of the next day
              first = false
              didAddToWorking = true // A longer path was found, don't add this to ready list
              //console.log('Added to working path', thisPath)
              const newPath = thisPath.slice(0)
              newPath.push(nextEntry)
              workingPaths.push(newPath)
            }
          }
        }
        if (!nextIsFavorite && !didAddToWorking && (thisPath.length >= minShows)) {
          // If the path is long enough and we didn't find longer paths
          results.paths.push(thisPath)
          addToVenues(thisPath)
          addToEntryMap(thisPath)
        }
      }
      if (!flush && workingPaths.length > MAX_PATHS) {
        // Contingency plan to stop algo from running too long. Have to find a good limit.
        flush = true
      }
    }
  }

  return results

}