// Grabbing lines on meme funcs

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     // gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     // gElCanvas.addEventListener('touchmove', onMove)
// //     gElCanvas.addEventListener('touchstart', onDown)
// //     gElCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     // Getting the clicked position
//     const pos = getEvPos(ev)
//     console.log('onDown ~ pos', pos)
//     // { x: 15, y : 15 }
//     if (!isLineClicked(pos)) return
//     gIsDrag = true
//     gPrevPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     if (!gIsDrag) return
//     const pos = getEvPos(ev)
//     const dx = pos.x - gPrevPos.x
//     const dy = pos.y - gPrevPos.y
//     moveLine(dx, dy)
//     gPrevPos = pos
//     renderMeme()
// }

// function isLineClicked(clickedPos) {
//     const pos = {}
//     pos.x = gLinesData[0].x
//     pos.y = gLinesData[0].y
//     const lineSize = gLinesData[0].fontSize

//     const width = getWidthHack(gLinesData[0].txt, lineSize)
//     const height = lineSize

//     const maxX = pos.x + (width / 2)
//     const minX = pos.x - (width / 2)
//     const maxY = pos.y
//     const minY = pos.y - lineSize

//     if (clickedPos.x <= maxX && clickedPos.x >= minX && clickedPos.y >= minY && clickedPos.y <= maxY) return true
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft,
//             y: ev.pageY - ev.target.offsetTop
//         }
//     }
//     return pos
// }


 // if (!meme.lines.pos) {
    //     meme.lines.forEach(line => {
    //         line.pos = {x: gElCanvas.width / 2, y: line.align}
    //     })
    // }