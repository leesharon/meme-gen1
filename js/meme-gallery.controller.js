'use strict'

function renderMemesGallery() {
    const memes = getMemesFromStorage()
    
    let strHTML = ``
    strHTML = memes.map(meme => `<img src${meme.memeURL}>`)

    document.querySelector('.meme-gallery .main-layout').innerHTML = strHTML.join('')
}