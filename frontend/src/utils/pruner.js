import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = async (entries, maxEntries, minBreak, maxBreak, cutOffAfterMidnight) => {

  let readyPaths = []

  if (!entries || entries.length === 0) {
    return readyPaths
  }

  // We're relying on the shows being in ascending order by showtime

  // First add all starting nodes to the "queue" (We're actually using an array like a queue)
  let workingPaths = []
  const firstStartTime = parseISO(entries[0].showtime)
  await entries.some((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(firstStartTime, nextStartTime) === 0) {
      // All shows as paths starting at the same time as the first show on the list are added
      // console.log('Add to starting nodes', entry.show.showname)
      let path = []
      entry.ind = index // Mark entry with the index of its place in the orginal list. More of that later.
      path.push(entry)
      workingPaths.push(path)
      return false
    }
    return true
  })

  // Then we start going through the "queue" of paths (Array of arrays)
  while (workingPaths.length > 0) {
    let thisPath = workingPaths.shift()
    // thisPath.map((entry) => {
    //   console.log('  In path:', entry.showtime, entry.show.showname)
    // })
    if (thisPath.length >= maxEntries) {
      // Add to ready list if number of maximum shows is reached
      readyPaths.push(thisPath)
    } else {
      let lastEntry = thisPath[(thisPath.length - 1)]
      // Take the last show of this path to know when it ends
      // console.log('Last entry:', lastEntry.showtime, lastEntry.show.showname)
      let thisStartTime = parseISO(lastEntry.showtime)
      let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
      let first = true
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
            let newPath = thisPath.slice(0)
            newPath.push(nextEntry)
            workingPaths.push(newPath)
          }
        }
        if (true) {
          // If we run out of shows before max number of shows is reached.
        }
      }
    }
    if (workingPaths.length > 100) {
      // Contingency plan to stop algo from running too long. Have to find a good limit.
      console.log('Reached too many working paths')
      break
    }
  }

  return readyPaths
}