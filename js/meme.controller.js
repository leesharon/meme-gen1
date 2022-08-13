
'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gIsDrag = false
let gIsResize = false
let gPrevPos
let gClickedLineIdx

function renderMeme() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')

    setMemeLinesData(gElCanvas)
    renderImg()
    addMouseListeners()
    addTouchListeners()
}

function renderImg() {
    const meme = getMeme()
    const imgURL = getImgURLById(meme.selectedImgId)
    const img = new Image
    img.src = imgURL

    img.addEventListener('load', () => {

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(meme.lines)
    })
}

function drawLines(lines) {
    lines.forEach(line => drawText(line.pos.x, line.pos.y, line.txt, line.fontSize, line.color, line.strokeColor, line.maxWidth))
}

function drawText(x, y, txt, fontSize, color, strokeColor = 'black', maxWidth) {
    gCtx.beginPath()
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 1
    gCtx.font = fontSize + 'px' + ' Impact'
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y, maxWidth)
    gCtx.strokeStyle = strokeColor
    gCtx.strokeText(txt, x, y, maxWidth)
    gCtx.closePath()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
    setTimeout(() => onSetLineFocus(), 10)
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
    setTimeout(() => onSetLineFocus(), 10)
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
    setTimeout(() => onSetLineFocus(), 10)
}

function onSetLineFocus() {
    const line = getSelectedLine()
    const lineSize = line.fontSize
    const txt = document.querySelector('.txt-input').value

    let width = getWidth(txt, lineSize)
    width = width - 13 * width / 100
    const height = lineSize + 10

    const x = line.pos.x - (width / 2)
    const y = line.pos.y - lineSize

    drawRect(x, y, height, width)
}

function onSwitchSelectedLine() {
    setTimeout(() => {
        switchSelectedLine()
        const txt = getSelectedLineTxt()
        document.querySelector('.txt-input').value = txt

        renderMeme()
        setTimeout(() => onSetLineFocus(), 30)
    }, 10);
}

function drawRect(x, y, height, width) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.lineWidth = 5
    gCtx.strokeStyle = '#ff7f00'
    gCtx.stroke()
    gCtx.closePath()
}

function getLineAlign() {
    const meme = getMeme()
    const align = meme.lines[meme.selectedLineIdx].align
    let y
    if (align === 'top') y = gElCanvas.height / 6
    else if (align === 'bottom') y = gElCanvas.height * 0.9
    else if (align === 'middle') y = gElCanvas.height / 2
    else if (align === 'middle-top') y = gElCanvas.height * 0.32
    else if (align === 'middle-bottom') y = gElCanvas.height * 0.72
    return y
}

function getWidth(txt, lineSize) {
    // checking div's width with the txt I need
    const div = document.querySelector('.width-test')

    div.innerText = txt
    div.style.fontSize = lineSize + 'px'
    div.style.display = "inline-block"
    const width = div.scrollWidth
    div.style.display = "none"

    return width
}

function onSaveMeme() {
    saveMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveSelectedLine() {
    removeSelectedLine()
    onSwitchSelectedLine()
    renderMeme()
}

function onToggleColorMenu() {
    document.querySelector('.clr-input').click()
}

function onShareMeme() {
    uploadImg(true)
}

function onImgInputIcon() {
    document.querySelector('.input-img').click()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg1)
}

function loadImageFromInput(ev, onImageReady) {

    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg1(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    uploadImg()
    setTimeout(() => {
        setMemeNewImg(getImgURL())
    }, 1000)
}

// Grabbing lines on meme funcs

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Getting the clicked position
    const pos = getEvPos(ev)

    let cursorStyle = document.querySelector('#canvas').style.cursor

    if (cursorStyle === 'ew-resize') {
        gIsResize = true

    } else if (cursorStyle === 'grab') {
        gIsDrag = true
        document.querySelector('#canvas').style.cursor = 'grabbing'

    }
    gPrevPos = pos
}

function onMove(ev) {
    const pos = getEvPos(ev)

    toggleCursorHoveredLines(pos)

    const dx = pos.x - gPrevPos.x
    const dy = pos.y - gPrevPos.y

    // resize line
    if (gIsResize) {
        setLineMaxWidth(dx, gClickedLineIdx)

    } else if (gIsDrag) { // Sets the drag once clicked a line
        moveLine(dx, dy, gClickedLineIdx)
    }

    gPrevPos = pos
    renderMeme()
}

function onUp() {
    if (gIsDrag) {
        gIsDrag = false
        document.querySelector('#canvas').style.cursor = 'grab'
    } else if (gIsResize) {
        gIsResize = false
        document.querySelector('#canvas').style.cursor = 'ew-resize'
    }
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data;
    elLink.download = 'canvas'
}

function toggleCursorHoveredLines(pos) {
    let cursorStyle = document.querySelector('#canvas').style.cursor

    if (cursorStyle === '') {
        if (!isLineHovered(pos)) return
    }

    // Toggles hover states over the text lines
    if (cursorStyle === 'grab' || cursorStyle === 'ew-resize') {
        if (!isLineHovered(pos)) {
            document.querySelector('#canvas').style.cursor = ''
        }
    }
}

function isLineHovered(clickedPos) {
    const lines = getMemeLines()
    // Checks if the clickedpos is in the borders of one of the lines
    let hoveredLine
    hoveredLine = lines.find((line, idx) => {
        const lineSize = line.fontSize
        const width = line.maxWidth
        const x = line.pos.x
        const y = line.pos.y

        const maxX = x + (width / 2)
        const minX = x - (width / 2)
        const maxY = y
        const minY = y - lineSize

        // inside line 
        if (clickedPos.x <= maxX && clickedPos.x >= minX && clickedPos.y >= minY && clickedPos.y <= maxY) {
            document.querySelector('#canvas').style.cursor = 'grab'
            gClickedLineIdx = idx

            // on corner
            if (clickedPos.x >= maxX - 12) {
                document.querySelector('#canvas').style.cursor = 'ew-resize'
            }
            return true
        }
    })
    return hoveredLine
}