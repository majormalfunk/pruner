
export const drawGraph = (prunedPaths) => {

  function drawShow(ctx, x, y, width, height) {
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(x, y, width, height)
    //ctx.fillRect(x, y, width, height)
  }

  const canvas = document.getElementById("myCanvas")
  let ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (prunedPaths && prunedPaths.length > 0) {

    ctx.canvas.height = prunedPaths.length * 101
    ctx.canvas.width = prunedPaths[0].length * 150
    prunedPaths.forEach((path, rowInd) => {
      let start = 25
      path.forEach((node, colInd) => {
        drawShow(ctx, start, (25+(rowInd*100)), node.show.duration, 25)
        start += node.show.duration + 10
      })
    })

  }

}