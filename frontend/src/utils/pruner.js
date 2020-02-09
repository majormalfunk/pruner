import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = (entries, maxEntries, minBreak, maxBreak, cutOffAfterMidnight) => {

  let paths = []

  //console.log('Entries', entries)

  if (!entries || entries.length === 0) {
    return paths
  }

  // We're relying on the shows being in ascending order by showtime
  let workingPaths = []
  const firstStartTime = parseISO(entries[0].showtime)
  entries.some((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(firstStartTime, nextStartTime) === 0) {
      let path = []
      entry.ind = index
      path.push(entry)
      workingPaths.push(path)
      return false
    }
    return true
  })
  console.log('Working paths:', workingPaths)

  while (workingPaths.length > 0) {
    let thisPath = workingPaths.shift()
    let lastEntry = thisPath[(thisPath.length - 1)]
    let thisStartTime = parseISO(lastEntry.showtime)
    let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
    let prevStartTime = thisStartTime
    let prevEndTime = thisEndTime
    //console.log('  From', thisStartTime, 'to', thisEndTime)
    let e
    let pathCopy = thisPath.slice(0)
    for (e = lastEntry.ind; e < entries.length; e++) { 
      let found = false
      let nextEntry = entries[e]
      console.log('  Next', nextEntry.showtime, nextEntry.show.showname)
      pathCopy.forEach((entry) => {
        console.log('  Path', entry.show.showname)
      })
      nextEntry.ind = e
      if (nextEntry.id !== lastEntry.id) {
        // Don't add start node again
        let nextStartTime = parseISO(nextEntry.showtime)
        let nextEndTime = addMinutes(nextStartTime, nextEntry.show.duration)
        const tooSoon = compareAsc(nextStartTime, addMinutes(thisEndTime, minBreak)) < 1
        const tooLate = compareAsc(addMinutes(thisEndTime, maxBreak), nextStartTime) < 1
        const tomorrow = compareAsc(addMinutes(endOfDay(thisEndTime), cutOffAfterMidnight), nextStartTime) < 1
        if (!tooSoon && (!tooLate || tomorrow)) {
          // Don't add if previous hasn't ended yet
          thisPath.push(nextEntry)
          prevStartTime = thisStartTime
          prevEndTime = thisEndTime
          thisStartTime = nextStartTime
          thisEndTime = nextEndTime
          found = true
        }
        //if (!found) {
          const tooSoon2 = compareAsc(nextStartTime, addMinutes(prevEndTime, minBreak)) < 1
          const tooLate2 = compareAsc(addMinutes(prevEndTime, maxBreak), nextStartTime) < 1
          const tomorrow2 = compareAsc(addMinutes(endOfDay(prevEndTime), cutOffAfterMidnight), nextStartTime) < 1
          if (!tooSoon2 && (!tooLate2 || tomorrow2)) {
            let newPath = pathCopy.slice(0)
            newPath.push(nextEntry)
            workingPaths.push(newPath)
          }
        //}
      }
      if (thisPath.length >= maxEntries) {
        //console.log('This path', thisPath)
        paths.push(thisPath)
        break
      }
    }
    if (workingPaths.length > 50) {
      // Contigency
      console.log('Reached 50 working paths')
      break
    }
  }

  return paths
}