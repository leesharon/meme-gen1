'use strict'

const STORAGE_KEY = 'memeDB'

const gLineStrs = [
    'Hey you, yes you!',
    'Seriously?',
    'Oh mannn..',
    'God damn it!',
    'Okie dokie!',
    'Say what?!',
    'Gotcha ;)',
    'Who are you again?',
    'Let\'s go!',
    'didn\'t see this one coming',
    'Oh yeah',
    'No way!!',
    'I\'m sexy and I know it',
    'Woohooooooo',
    'you sure about that?'
]

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your text goes here',
            fontSize: 30,
            align: 'top',
            color: 'white',
            strokeColor: 'black'
        },
        {
            txt: 'and here...',
            fontSize: 30,
            align: 'bottom',
            color: 'white',
            strokeColor: 'black'
        }
    ],
    imgURL: null
}

function setLineTxt(txt) {
    getSelectedLine().txt = txt
}

function setColor(color) {
    getSelectedLine().color = color
}

function changeFontSize(isIncrease) {
    if (isIncrease) {
        if (getSelectedLine().fontSize >= 80) return
        getSelectedLine().fontSize += 10
    } else {
        if (getSelectedLine().fontSize <= 20) return
        getSelectedLine().fontSize -= 10
    }
}

function setImage(imgId) {
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

function setMeme(meme) {
    gMeme = meme
}

function switchSelectedLine(selectedLineIdx, isLineClicked) {
    if (isLineClicked) {
        gMeme.selectedLineIdx = selectedLineIdx
        return
    }

    if (selectedLineIdx) {
        gMeme.selectedLineIdx = selectedLineIdx
    } else {
        gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    }
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setFlexibleMemeOptions() {

    // Randomly selects number of lines
    const lineCount = getRandomIntInclusive(0, 1) ? 1 : 2
    if (lineCount === 1) gMeme.lines.splice(1, 1)

    // Randomly text strings for each line
    gMeme.lines.forEach(line => line.txt = gLineStrs[getRandomInt(0, gLineStrs.length)])

    // Randomly selects font size
    gMeme.lines.forEach(line => line.fontSize = getRandomIntInclusive(20, 70))

    // Randomly selects color & stroke color
    gMeme.lines.forEach(line => line.color = getRandomColor())
    gMeme.lines.forEach(line => line.strokeColor = getRandomColor())

}

function saveMeme() {
    let savedMemes = _loadMemesFromStorage()
    if (!savedMemes) savedMemes = []

    const memeImgURL = getImgURLById(gMeme.selectedImgId)
    gMeme.imgURL = memeImgURL

    savedMemes.push(gMeme)
    _saveMemesToStorage(savedMemes)

    // Set meme as image
}

function savedMemesToStorage(memes) {
    _saveMemesToStorage(memes)
}

function getSavedMemesFromStorage() {
    return _loadMemesFromStorage()
}

function _saveMemesToStorage(val) {
    saveToStorage(STORAGE_KEY, val)
}

function _loadMemesFromStorage() {
    return loadFromStorage(STORAGE_KEY)
}

function removeSelectedLine() {
    if (gMeme.lines.length === 0) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function addLine() {
    // Max line number
    if (gMeme.lines.length === 5) return

    let align

    const newLine = {
        txt: 'Another Line of Text...',
        fontSize: 30,
        align: align,
        color: 'white',
        strokeColor: 'black'
    }

    // Check for the line's vertical alignment and pushes the line accordingly into the lines array
    if (!gMeme.lines.find(line => line.align === 'top')) {
        newLine.align = 'top'
        gMeme.lines.unshift(newLine)
    }
    else if (!gMeme.lines.find(line => line.align === 'bottom')) {
        newLine.align = 'bottom'
        gMeme.lines.push(newLine)
    }
    else if (!gMeme.lines.find(line => line.align === 'middle')) {
        newLine.align = 'middle'
        gMeme.lines.splice(1, 0, newLine)
    }
    else if (!gMeme.lines.find(line => line.align === 'middle-top')) {
        newLine.align = 'middle-top'
        gMeme.lines.splice(1, 0, newLine)
    }
    else {
        newLine.align = 'middle-bottom'
        gMeme.lines.splice(3, 0, newLine)
    }
}

function getMemesFromStorage() {
    return loadFromStorage(STORAGE_KEY)
}

function moveLine(x, y, lineIdx) {
    gMeme.lines[lineIdx].pos.x += x
    gMeme.lines[lineIdx].pos.y += y
}

function setMemeNewImg(url) {
    const imgId = gImgs.length + 1
    const newImg = { id: imgId, url: url, keywords: [] }

    gMeme.selectedImgId = imgId
    gImgs.push(newImg)
}

function setMemeLinesData(elCanvas) {
    gMeme.lines.forEach((line, idx) => {

        // Sets the lines positions
        if (!line.pos) {
            const pos = {}
            pos['x'] = elCanvas.width / 2

            // Calculates position of the line
            let y
            if (line.align === 'top') y = elCanvas.height / 6
            else if (line.align === 'bottom') y = elCanvas.height * 0.9
            else if (line.align === 'middle') y = elCanvas.height / 2
            else if (line.align === 'middle-top') y = elCanvas.height * 0.32
            else if (line.align === 'middle-bottom') y = elCanvas.height * 0.72

            pos['y'] = y

            gMeme.lines[idx].pos = pos
        }
    })
}

function getMemeLines() {
    return gMeme.lines
}

function setLineWidth(dx, lineIdx) {
    gMeme.lines[lineIdx].fontSize += dx / 4
}