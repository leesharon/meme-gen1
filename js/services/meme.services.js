'use strict'

const STORAGE_KEY = 'memeDB'
const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'serious'] },
    { id: 2, url: 'img/2.jpg', keywords: ['sweet', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['sweet', 'animal', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sweet', 'animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['sweet', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['celebrity', 'info'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['celebrity'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'celebrity'] },
    { id: 11, url: 'img/11.jpg', keywords: ['celebrity'] },
    { id: 12, url: 'img/12.jpg', keywords: ['celebrity', 'funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['celebrity', 'funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['celebrity', 'serious'] },
    { id: 15, url: 'img/15.jpg', keywords: ['celebrity'] },
    { id: 16, url: 'img/16.jpg', keywords: ['movie', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'serious'] },
    { id: 18, url: 'img/18.jpg', keywords: ['movie', 'funny'] },
]

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

const gKeywords = [
    { name: 'politics', value: 0.8 },
    { name: 'sweet', value: 1.4 },
    { name: 'animal', value: 1.2 },
    { name: 'baby', value: 1.8 },
    { name: 'celebrity', value: 1.1 },
    { name: 'funny', value: 2.2 },
    { name: 'movie', value: 1 }
]

const gMeme = {
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
    memeUrl: null
}

let gFilterBy

function getImgsForDisplay() {

    if (!gFilterBy) return gImgs
    return gImgs.filter(img => img.keywords
        .find(keyword => keyword.toLowerCase()
            .includes(gFilterBy.toLowerCase())))
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize === 80) return
    gMeme.lines[gMeme.selectedLineIdx].fontSize += 10
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize === 20) return
    gMeme.lines[gMeme.selectedLineIdx].fontSize -= 10
}

function setImage(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgURLById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img.url
}

function getMeme() {
    return gMeme
}

function switchSelectedLine() {
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getImgsLength() {
    return gImgs.length
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
    let memesDB = loadFromStorage(STORAGE_KEY)
    if (!memesDB) memesDB = []

    // sets an image URL for the meme to display later in the gallery
    uploadImg()
    setTimeout(() => {
        gMeme['memeUrl'] = getUploadedImgURL()
        memesDB.push(gMeme)
        saveToStorage(STORAGE_KEY, memesDB)
    }, 2000)
}

function setImgFilterBy(filterBy) {
    gFilterBy = filterBy
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

function getKeywords() {
    return gKeywords
}

function setKeywordsValue(keywordName) {
    const keywordIdx = gKeywords.findIndex(keyword => keyword.name === keywordName.toLowerCase())
    gKeywords[keywordIdx].value += 0.05
}

function getMemeLines() {
    return gMeme.lines
}

function setMemeLinesPosition(elCanvas) {
    gMeme.lines.forEach((line, idx) => {
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

function isLineClicked(clickedPos) {
    const lines = getMemeLines()
    // Checks if the clickedpos is in the borders of one of the lines
    let clickedLine
    clickedLine = lines.find((line, idx) => {
        const lineSize = line.fontSize
        const width = getWidth(line.txt, lineSize)
        const x = line.pos.x
        const y = line.pos.y

        const maxX = x + (width / 2)
        const minX = x - (width / 2)
        const maxY = y
        const minY = y - lineSize

        if (clickedPos.x <= maxX && clickedPos.x >= minX && clickedPos.y >= minY && clickedPos.y <= maxY) {
            gClickedLineIdx = idx
            return true
        }
    })
    return clickedLine
}