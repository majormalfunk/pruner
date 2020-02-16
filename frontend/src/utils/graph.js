
export const drawGraph = (prunedPaths) => {

  function drawShow(ctx, x, y, width, height) {
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(x, y, width, height)
  }

  const canvas = document.getElementById("myCanvas")
  let ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (prunedPaths && prunedPaths.length > 0) {

    ctx.canvas.height = prunedPaths.length * 101
    ctx.canvas.width = prunedPaths[0].length * 150
    let repeatedIds = []
    //let paths = prunedPaths.slice()
    prunedPaths.forEach((path, rowInd) => {
      //let pathStr = `Path #${rowInd}: `
      //path.forEach((entry) => {
      //  pathStr = pathStr.concat(entry.id).concat(' -> ')
      //})
      //console.log(pathStr)
      let start = 25
      let repeats = 0
      path.forEach((node, colInd) => {
        /*
        if (!repeatedIds.includes(node.id)) {
          while (paths.length > 1 && rowInd < (prunedPaths.length - 1)) {
            let next = paths[rowInd + 1].shift()
            if (!next || (next.id !== node.id)) {
              break
            }
            repeatedIds.push(node.id)
            repeats++
          }
          drawShow(ctx, start, (25+(rowInd*50)), node.show.duration, 25)
        }
        */
        drawShow(ctx, start, (25+(rowInd*50)), node.show.duration, 25)
        start += node.show.duration + 10
      })
    })

  }

}