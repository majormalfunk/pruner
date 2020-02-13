import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = async (entries, minShows, maxShows, minBreak, maxBreak, cutOffAfterMidnight) => {

  console.log ('Trying for', entries.length, 'entries')

  console.log('Start', new Date())

  let results = {}
  results.paths = []
  results.interruptedPaths = []
  let maxQueueCount = 0

  if (!entries || entries.length === 0) {
    return results
  }

  // We're relying on the shows being in ascending order by showtime

  // First add all starting nodes to the "queue" (We're actually using an array like a queue)
  let workingPaths = []
  const firstStartTime = parseISO(entries[0].showtime)
  await entries.some((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(firstStartTime, nextStartTime) === 0) {
      // All shows as paths starting at the same time as the first show on the list are added
      let path = []
      entry.ind = index // Mark entry with the index of its place in the orginal list. More of that later.
      //console.log('Add to starting nodes', entry.show.showname, 'from index', entry.ind)
      path.push(entry)
      workingPaths.push(path)
      return false
    }
    return true
  })

  // Then we start going through the "queue" of paths (Array of arrays)
  let flush = false
  while (workingPaths.length > 0) {
    let thisPath = workingPaths.shift()
    //thisPath.map((entry) => {
    //  console.log('  In path:', entry.showtime, entry.show.showname, 'with index', entry.ind)
    //})
    if (thisPath.length >= maxShows) {
      // Add to ready list if number of maximum shows is reached
      results.paths.push(thisPath)
      /*
      console.log('Full path:')
      thisPath.map((entry) => {
        console.log('  ', parseISO(entry.showtime), addMinutes(parseISO(entry.showtime), entry.show.duration),
        entry.venue.venuename, entry.show.showname, entry.show.duration, entry.ind)
        })
      */
    } else if (flush) {
      results.interruptedPaths.push(thisPath)
    } else { 
      let lastEntry = thisPath[(thisPath.length - 1)]
      // Take the last show of this path to know when it ends
      // console.log('Last entry:', lastEntry.showtime, lastEntry.show.showname)
      let thisStartTime = parseISO(lastEntry.showtime)
      let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
      let first = true // So we know to add tomorrows first show or not
      let didAddToWorking = false // So we know if we should add paths long enough to ready list
      for (let e = lastEntry.ind + 1; e < entries.length; e++) {
        // Now take the next from the original list. We use the added ind of entry
        // so we know where it was int the orginal list and don't have to go through
        // the list from the beginning.
        let nextEntry = entries[e]
        // console.log('  Next entry:', nextEntry.showtime, nextEntry.show.showname)
        nextEntry.ind = e
        if (nextEntry.id !== lastEntry.id) {
          // Don't add start node again (if we made a mistake)
          let nextStartTime = parseISO(nextEntry.showtime)
          const tooSoon = compareAsc(nextStartTime, addMinutes(thisEndTime, minBreak)) < 1
          const tooLate = compareAsc(addMinutes(thisEndTime, maxBreak), nextStartTime) < 1
          const tomorrow = compareAsc(addMinutes(endOfDay(thisEndTime), cutOffAfterMidnight), nextStartTime) < 1
          if ((!tooSoon && !tooLate) || (first && tomorrow)) {
            // We're only adding a show to the path if it
            // - doesn't start before the previous ends + marginal and doesn't leave a gap too long
            // - or we have a new path from the queue and the first encountered show is on the next day
            first = false
            didAddToWorking = true // A longer path was found, don't add this to ready list
            let newPath = thisPath.slice(0)
            newPath.push(nextEntry)
            workingPaths.push(newPath)
            maxQueueCount = (workingPaths.length > maxQueueCount ? workingPaths.length : maxQueueCount)
          }
        }
      }
      if (!didAddToWorking && (thisPath.length >= minShows)) {
        // If the path is long enough and we didn't find longer paths
        results.paths.push(thisPath)
        /*
        console.log('Long enough:')
        thisPath.map((entry) => {
          console.log('  ', parseISO(entry.showtime), addMinutes(parseISO(entry.showtime), entry.show.duration),
            entry.venue.venuename, entry.show.showname, entry.show.duration, entry.ind)
        })
        */
      }
    }
    if (!flush && workingPaths.length > 512) {
      // Contingency plan to stop algo from running too long. Have to find a good limit.
      flush = true
      console.log('Flushing, reached too many working paths')
    }
  }
  console.log('End', new Date())
  console.log('Max queue', maxQueueCount)
  /*
  if (readyPaths && readyPaths.length > 0) {
    console.log('First path')
    readyPaths[0].map((entry) => {
      console.log(entry.showtime, entry.venue.venuename, entry.show.showname, entry.show.duration, entry.ind)
    })
    console.log('Last path')
    readyPaths[readyPaths.length - 1].map((entry) => {
      console.log(entry.showtime, entry.venue.venuename, entry.show.showname, entry.show.duration, entry.ind)
    })
    console.log('All paths')
    console.log(readyPaths)
  }
  */

  return results

}