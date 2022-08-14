'use strict'

function onInit() {
    renderGallery()
    renderKeywordsList()
}

function renderGallery() {
    const imgs = getImgsForDisplay()
    let strHTML = ``
    strHTML = imgs.map(img => strHTML = `<img onclick="onImgSelect(${img.id})" src=${img.url}>`)

    document.querySelector('.gallery .main-layout').innerHTML = strHTML.join('')
}

function onImgSelect(imgId, isFlexible, savedMemeIdx) {
    if (isFlexible) imgId = getRandomIntInclusive(1, getImgsLength())

    if (savedMemeIdx) {
        const memes = getSavedMemesFromStorage()
        const meme = memes[savedMemeIdx]
        setMeme(meme)
    }

    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.filter-bar').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.meme-editor-container').style.display = 'flex'

    setImage(imgId)
    renderMeme()
}

// renders search bar keywords
function renderKeywordsList() {
    const keywords = getKeywordsMap()

    // Handles words popularity size changes
    let keywordsTotalValue = 0

    for (const keyword in keywords) {
        keywordsTotalValue += keywords[keyword]
    }

    // Renders keywords datalist options
    let strDataListHTML

    for (const keyword in keywords) {
        strDataListHTML += `
             <option value=${keyword.charAt(0).toUpperCase() + keyword.slice(1)}>
         `
    }
    document.querySelector('.list-keywords').innerHTML = strDataListHTML

    // Renders keywords ul
    let strHTML = ``

    for (const keyword in keywords) {
        strHTML += `
            <li style="font-size: ${keywords[keyword] * 10 / keywordsTotalValue}em;" onclick="onSetImgFilter(this.innerText, true)">
                ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}
            </li>
         `
    }
    document.querySelector('.filter-list').innerHTML = strHTML
}

function onFlexible() {
    setFlexibleMemeOptions()
    onImgSelect(undefined, true)
}

function onSetImgFilter(filterBy, isKeywordClicked) {
    if (isKeywordClicked) document.querySelector('.input-search').value = ''

    filterBy = filterBy.toLowerCase()

    setImgFilterBy(filterBy)
    renderGallery()
    renderKeywordsList()
    setKeywordsValue(filterBy)
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
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.about').style.display = 'none'
}

function onDisplayAbout() {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.filter-bar').style.display = 'none'
    document.querySelector('.meme-editor-container').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.about').style.display = 'flex'
}