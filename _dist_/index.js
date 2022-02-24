import { registerImage } from './lazy.js';

/* Assets */
import foxIcon from './assets/foxIcon.png.proxy.js';

/* Nodos principales */
const body = document.querySelector('#body')
const main = document.createElement('main') 
main.id = 'app'

/* Info Section */

const containerInfo = document.createElement('section')
containerInfo.className = 'display-flex-column containerInfo'
const titleMid = document.createElement('h2');
titleMid.textContent = 'Api random fox | github @pbyjo'
const foxLogo = document.createElement('img')
const title = document.createElement('h1')
title.textContent = 'Encuentra tu fox favorito.'

/* 
---- fox api section ----
                            */
const foxSection = document.createElement('section')
foxSection.className = 'display-flex-column'

const minimum = 1
const maximun = 122
const randomfox = () => Math.floor(Math.random() * (maximun - minimum)) + minimum

const createImageNode = () => {
    const imageFoxContainer = document.createElement('figure')
    imageFoxContainer.className = 'imageContainer'
    imageFoxContainer.style = ` min-height: 150px;`
    
    const imageFox = document.createElement('img')
    imageFox.className = 'img-fox'
    imageFox.dataset.src = `https://randomfox.ca/images/${randomfox()}.jpg`

    
    imageFoxContainer.appendChild(imageFox)
    return imageFoxContainer
    
}

/* Buttons container */
const buttonsContainer = document.createElement('section')
const buttonAdd = document.createElement('button')
const buttonClear = document.createElement('button')
buttonAdd.classList = 'buttonAdd'
buttonAdd.textContent = 'Agregar Fox'
buttonClear.classList = 'buttonClear'
buttonClear.textContent = 'Limpiar'
buttonsContainer.className = 'display-flex-row'

/* Buttons events */
const addImageFunction = () => {
    const newImage = createImageNode()
    registerImage(newImage)
    foxSection.append(newImage)
    return foxSection
}
const deleteImageFunction = () => {

    /* opc 1 */
    const allFoxesFigure = [
        ...foxSection.childNodes
    ]

    allFoxesFigure.map(
        item => {
            item.remove();
        }
    )

    /* opc 2 
    foxSection.innerHTML = '' */
}

buttonAdd.addEventListener('click', addImageFunction)
buttonClear.addEventListener('click', deleteImageFunction)

foxLogo.src = foxIcon
foxLogo.className = 'imgLogo'

/* Inyección */
buttonsContainer.append(buttonAdd, buttonClear);
containerInfo.append(titleMid, foxLogo, title);
main.append(containerInfo, buttonsContainer, foxSection);
body.appendChild(main);