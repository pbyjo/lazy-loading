let totalImages = 0;
let loadedImages = 0;

const functionWhatIDo = (entries) => {
    entries
        .filter(
            (payload) => {
                return payload.isIntersecting
            }
        )
        .map(
            (payload) => {
                const imageFoxContainer = payload.target // guardamos el nodo figure
                const imgg = imageFoxContainer.firstChild // obtenemos img de figure
                const url = imgg.dataset.src // la data de la url

                imgg.onload = () => {
                    loadedImages += 1;
                    logState();
                }

                //cargar img
                imgg.src = url;
                //unlisten
                observer.unobserve(imageFoxContainer)
            }
        )
}

const observer = new IntersectionObserver(functionWhatIDo)

export const registerImage = (imgg) => {
    // intersection observer
    observer.observe(imgg)
    totalImages +=1;
    logState()
}

function logState () {
    console.log(`⚪️ Length Images: ${totalImages}`)
    console.log(`🟣 Loaded Images: ${loadedImages}`)
    console.log("---------------------------------")
}