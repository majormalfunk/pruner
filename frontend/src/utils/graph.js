import { parseISO, differenceInMinutes, isSameDay } from 'date-fns'

export const drawGraph = (prunedPaths) => {

  const { paths, entryMap, entrySets } = prunedPaths
  const ENTRY_WIDTH = 40
  const ENTRY_GAP = 25

  function drawShow(ctx, x, y, width, height) {
    ctx.fillStyle = "#880088"
    ctx.fillRect(x, y, width, height)
  }

  function maxWidth() {
    let maxEntries = 0
    entrySets.forEach((slot) => {
      maxEntries = (slot.size > maxEntries ? slot.size : maxEntries)
    })
    return ENTRY_GAP + (maxEntries * (ENTRY_WIDTH + ENTRY_GAP))
  }

  function maxHeight() {
    return paths.length * 101
  }

  const canvas = document.getElementById("myCanvas")
  let ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (paths && paths.length > 0) {

    const width = maxWidth()
    ctx.canvas.height = maxHeight()
    ctx.canvas.width = width

    let firstShow = paths[0][0]
    let firstShowAt = parseISO(firstShow.showtime)
    entrySets.forEach((set) => {
      let dayBreak = 0
      const entriesInSet = set.size
      let entryNum = 0
      set.forEach((entry) => {
        entryNum++
        let showStartAt = parseISO(entry.showtime)
        if (!isSameDay(showStartAt, firstShowAt)) {
          dayBreak = 600
        }
        const y = ENTRY_GAP + differenceInMinutes(showStartAt, firstShowAt) - dayBreak
        const x = ENTRY_GAP + (entryNum * (width / (entriesInSet + 1))) - (ENTRY_WIDTH / 2)
        console.log('( x , y ) = (', x, ',', y, ')')
        drawShow(ctx, x, y, ENTRY_WIDTH, entry.show.duration)
      })
    })

  }

}