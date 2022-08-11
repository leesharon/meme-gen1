'use strict'

function renderMemesGallery() {
    const memes = getMemesFromStorage()
    
    let strHTML = ``
    strHTML = memes.map(meme => `<img src${meme.memeURL}>`)
    console.log('renderMemesGallery ~ strHTML', strHTML)

    document.querySelector('.meme-gallery .main-layout').innerHTML = strHTML.join('')
}