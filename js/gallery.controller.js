'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgsForDisplay()
    let strHTML = ``
    strHTML = imgs.map(img => strHTML = `<img onclick="onImgSelect(${img.id})" src=${img.url}>`)

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

function onFlexibleClick() {
    setMemeOptions()
    onImgSelect()
}

function onSetImgFilter(filterBy) {
    setImgFilterBy(filterBy)
    renderGallery()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-opened')
}

function onToggleActive(elItem) {
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