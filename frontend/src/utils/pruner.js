import { parseISO, compareAsc, addMinutes, endOfDay } from 'date-fns'

export const makePaths = async (entries, maxEntries, minBreak, maxBreak, cutOffAfterMidnight) => {

  let paths = []

  //console.log('Entries', entries)

  if (!entries || entries.length === 0) {
    return paths
  }

  // We're relying on the shows being in ascending order by showtime
  let workingPaths = []
  const firstStartTime = parseISO(entries[0].showtime)
  await entries.some((entry, index) => {
    let nextStartTime = parseISO(entry.showtime)
    if (compareAsc(firstStartTime, nextStartTime) === 0) {
      console.log('Add to starting nodes', entry.show.showname)
      let path = []
      entry.ind = index
      path.push(entry)
      workingPaths.push(path)
      return false
    }
    return true
  })

  let noMore = false

  while (workingPaths.length > 0) {
    console.log('Path from queue')
    let thisPath = workingPaths.shift()
    thisPath.map((entry) => {
      console.log('  In path:', entry.showtime, entry.show.showname)
    })
    if (thisPath.length >= maxEntries) {
      console.log('Path ready')
      paths.push(thisPath)
    } else {
      let lastEntry = thisPath[(thisPath.length - 1)]
      //console.log('Last entry:', lastEntry.showtime, lastEntry.show.showname)
      let thisStartTime = parseISO(lastEntry.showtime)
      let thisEndTime = addMinutes(thisStartTime, lastEntry.show.duration)
      let prevStartTime = thisStartTime
      let prevEndTime = thisEndTime
      for (let e = lastEntry.ind + 1; e < entries.length; e++) {
        let nextEntry = entries[e]
        console.log('  Next entry:', nextEntry.showtime, nextEntry.show.showname)
        nextEntry.ind = e
        if (nextEntry.id !== lastEntry.id) {
        // Don't add start node again
          let nextStartTime = parseISO(nextEntry.showtime)
          let nextEndTime = addMinutes(nextStartTime, nextEntry.show.duration)
          const tooSoon = compareAsc(nextStartTime, addMinutes(thisEndTime, minBreak)) < 1
          const tooLate = compareAsc(addMinutes(thisEndTime, maxBreak), nextStartTime) < 1
          const tomorrow = compareAsc(addMinutes(endOfDay(thisEndTime), cutOffAfterMidnight), nextStartTime) < 1
          if ((!tooSoon && !tooLate) || tomorrow) {
            let newPath = thisPath.slice(0)
            newPath.push(nextEntry)
            workingPaths.push(newPath)
            if (tomorrow) {
              console.log('Will break')
              break
            }
          }
        }
      }
    }
    if (workingPaths.length > 100) {
      // Contingency
      console.log('Reached 100 working paths')
      noMore = true
      break
    }
  }

  return paths
}