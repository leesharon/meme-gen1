
'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function renderMeme() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    const meme = getMeme()
    
    renderImg(meme)
}

function renderImg(meme) {
    const imgURL = getImgURLById(meme.selectedImgId)
    const img = new Image
    img.src = imgURL

    img.addEventListener('load', () => {

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(meme.lines)
    })
}

function drawLines(lines) {
    lines.forEach(line => drawText(gElCanvas.width / 2, line.align, line.txt, line.fontSize, line.color, line.strokeColor))
}

function drawText(x, align, txt, fontSize, color, strokeColor = 'black') {
    // Calculates position of the line
    let y
    if (align === 'top') y = gElCanvas.height / 6
    else if (align === 'bottom') y = gElCanvas.height * 0.9
    else if (align === 'middle') y = gElCanvas.height / 2
    else if (align === 'middle-top') y = gElCanvas.height * 0.32
    else if (align === 'middle-bottom') y = gElCanvas.height * 0.72

    gCtx.beginPath()
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 1
    gCtx.font = fontSize + 'px' + ' Impact'
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y, gElCanvas.width * 0.8)
    gCtx.strokeStyle = strokeColor
    gCtx.strokeText(txt, x, y, gElCanvas.width * 0.8)
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
    const lineSize = getSelectedLineSize()
    const txt = document.querySelector('.txt-input').value

    // Has some bug with the first line width, leaving as a reference
    // const txtMeasure = gCtx.measureText(txt)
    // const width = txtMeasure.width + 15
    // console.log('onSetLineFocus ~ txtMeasure', txtMeasure)

    const width = getWidth(txt, lineSize)
    const height = lineSize + 10

    const x = (gElCanvas.width / 2) - (width / 2)
    const y = getLineAlign() - (lineSize)

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
    gCtx.strokeStyle = 'red'
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