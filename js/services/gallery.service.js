'use strict'

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

// const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const gKeywords = [
    { name: 'politics', value: 0.8 },
    { name: 'sweet', value: 1.4 },
    { name: 'animal', value: 1.2 },
    { name: 'baby', value: 1.8 },
    { name: 'celebrity', value: 1.1 },
    { name: 'funny', value: 2.2 },
    { name: 'movie', value: 1 }
]

let gFilterBy

function getImgsForDisplay() {
    if (!gFilterBy || gFilterBy === '') return gImgs

    const filterBy = gFilterBy.toLowerCase()
    return gImgs.filter(img => {
        return img.keywords.find(keyword => keyword.toLowerCase().includes(filterBy))
    })
}

function getImgURLById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img.url
}

function getImgsLength() {
    return gImgs.length
}

function setImgFilterBy(filterBy) {
    gFilterBy = filterBy
}

function getKeywords() {
    return gKeywords
}

function setKeywordsValue(keywordName) {
    const keywordIdx = gKeywords.findIndex(keyword => keyword.name === keywordName.toLowerCase())
    gKeywords[keywordIdx].value += 0.05
}