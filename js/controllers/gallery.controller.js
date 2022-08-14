'use strict'

function onInit() {
    renderGallery()
    renderKeywordsList()
}

function renderGallery() {
    const imgs = getImgsForDisplay()
    let strHTML = ``
    strHTML = imgs.map(img => strHTML = `<img onclick="onImgSelect(${img.id})" src=${img.url}/>`)

    document.querySelector('.gallery .main-layout').innerHTML = strHTML.join('')
}

function onImgSelect(imgId = getRandomIntInclusive(1, getImgsLength())) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.filter-bar').style.display = 'none'
    document.querySelector('.meme-editor-container').style.display = 'flex'
    document.querySelector('.main-footer').style.position = 'fixed'

    setImage(imgId)
    renderMeme()
}

// renders search bar keywords
function renderKeywordsList() {
    const keywords = getKeywords()
    let keywordsTotalValue = 0
    keywords.forEach(keyword => keywordsTotalValue += keyword.value)
    let strHTML
    strHTML = keywords.map(keyword => `
    <li style="font-size: ${keyword.value * 10 / keywordsTotalValue}em;" onclick="onSetImgFilter(undefined, this)">${keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)}</li>
    `)

    document.querySelector('.filter-list').innerHTML = strHTML.join('')
}

// flexible button click
function onFlexibleClick() {
    setFlexibleMemeOptions()
    onImgSelect()
}

function onSetImgFilter(filterBy, elWord) {
    if (!filterBy) {
        filterBy = elWord.innerText
        setKeywordsValue(elWord.innerText)
    }
    setImgFilterBy(filterBy)
    renderGallery()
    renderKeywordsList()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-opened')
}

function onSetActiveClass(elItem) {
    document.querySelector('.item1').classList.remove('active')
    document.querySelector('.item2').classList.remove('active')
    document.querySelector('.item3').classList.remove('active')
    elItem.classList.add('active')
}

function onDisplayGallery() {
    document.querySelector('.gallery').style.display = 'flex'
    document.querySelector('.filter-bar').style.display = 'flex'
    document.querySelector('.meme-editor-container').style.display = 'none'
    document.querySelector('.main-footer').style.position = 'fixed'
}