'use strict'

function onDisplaySavedMemes() {
    document.body.classList.remove('menu-opened')
    document.querySelector('.about').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.filter-bar').style.display = 'none'
    document.querySelector('.meme-editor-container').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'flex'

    const savedMemes = getSavedMemesFromStorage()
    
    let strHTML = ``
    strHTML = savedMemes.map((meme, memeIdx) => strHTML = `
    <div class="img-wrap">
    <img onclick="onImgSelect(${meme.selectedImgId}, false, ${memeIdx})" src='${meme.imgURL}'>
    <button class="btn-remove-meme" onclick="onRemoveSavedMeme(${memeIdx})">
    <i class="fa-solid fa-xmark"></i>
    </button>
    </div>
    `).join('')
    
    if (!savedMemes.length) strHTML = `<p>you have no saved memes</p>`
    
    document.querySelector('.saved-memes .main-layout').innerHTML = strHTML
}

function onRemoveSavedMeme(memeIdx) {
    const savedMemes = getSavedMemesFromStorage()
    savedMemes.splice(memeIdx, 1)
    
    savedMemesToStorage(savedMemes)
    onDisplaySavedMemes()
    displayUserMsg(false)
}