# Snowpack Tailwind

> ✨ Bootstrapped with Create Snowpack App (CSA).

Ready-to-go template to create awesome websites using Tailwind on top of Snowpack and autopublish to GitHub pages using GitHub Actions.

- [Quick start](#quick-start)
- [Features](#features)
- [Available Scripts](#available-scripts)

## Quick start

```sh
# Bootstrap the template into a new folder called `my-app`
npx create-snowpack-app my-app --template snowpack-template-tailwind

# Enable Prettier on git-commit
cd my-app
npm run install:husky

# Start the development server
npm start
```

✨ Optional: [Enable autopublish](#q-how-do-i-enable-auto-publish-to-github-pages) to get your site deployed on GitHub Pages on every commit you push.

#### Optional install using Yarn:

```sh
# Bootstrap the template into a new folder called `my-app`
npx create-snowpack-app my-app --template snowpack-template-tailwind --use-yarn

# Enable Prettier on git-commit
cd my-app
yarn install:husky
```

## Features

- Snowpack, of course.
- Tailwind.
- Prettier.
- Force prettier on git-commit.
- Autopublish on Github Pages.

### Q: How do I enable auto publish to GitHub Pages?

1. Update the value of `homepage` in `package.json`. It should look like `https://<your-username>.github.io/<your-repo-name>` (no trailing slash).
1. Push your changes into a new GitHub repository.
1. You should see an Action running on `https://github.com/<your-username>/<repo-name>/actions`
1. Make sure to [enable GitHub pages for your repo](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source) and select the `gh-pages` branch
1. Give GH Pages some minutes, your site should be live on `https://<your-username>.github.io/<your-repo-name>`
1. Enjoy :)

### Q: How do I disable auto publish to GitHub Pages?

Remove the `.github/workflows/publish.yml` file.

### Q: How do I check my code syntax (Prettier) on git-commit?

Run `npm run install:husky`.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.

### Workshop 2

#### Segundo Proyecto (Lazy loading)

Lazy loading o carga perezosa nos permite cargar los elementos a medida que se van mostrando en el viewModel con esto el contenido carga solo cuando el usuario lo pide en este caso haciendo scroll, ademas de ello se agrega un loading skeleton para mostrar un pre de que la imagen esta cargando en realidad.

#### Nuestro propio plugin Lazy Loading

instalamos template snowpack y hacemos el mismo proceso inicial que con el proyecto 1, basicamente necesitamos organizar y estructurar la maquetacion html de como se veran nuestros zorros.

#### Creando las imagenes con JavaScript

creamos una funcion que nos dos nodos, uno que contiene la imagen y otro para la imagen. En el nodo imageFox en su prop src le insertamos la url que nos da como promesa una imagen random de la api.

``` js 
const createImageNode = () => {
    const imageFoxContainer = document.createElement('figure')
    imageFoxContainer.className = 'imageContainer'
    
    const imageFox = document.createElement('img')
    imageFox.className = 'img-fox'
    imageFox.src = `https://randomfox.ca/images/${randomfox()}.jpg`
    
    imageFoxContainer.appendChild(imageFox)
    
    return imageFoxContainer
}
```

Luego con una funcion del botton agregar instanciamos una nueva imagen por cada acción. 

``` js 
const addImageFunction = () => {
    const newImage = createImageNode()
    foxsSection.append(newImage)
    return foxsSection
}
```

#### Insertion Observer | web api

Con el **IntersectionObserver** podemos decirle a JavaScript que observe un objeto cuando está dentro de la pantalla (o cuando sale de esta), en el curso Profesional de JavaScript se habla sobre esto, específicamente en la clase de Intersection Observer, les dejo el link por si quieren profundizar en ello:

`https://platzi.com/clases/1642-javascript-profesional/22175-intersectionobserver/`

`https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API`

**IntersectionObserver** observa todos los objetos por lo que es necesario filtrar solo lo que esta siendo interceptado `.filter(IsIntersecting)` para aplicar nuestro lazy loading.

#### Aplicando Lazy Loading

Aqui a nuestro observer le decimos que accion debe realizar al tener los objetos dentro del viewport, y como son imagenes estas deben cargar dentro de su respectivo contenedor al entrar en el viewport.

``` js 
    ...
    entries
        .filter(
            (payload) => {
                return payload.isIntersecting
            }
        )
        .map(
            (payload) => {
                const imageFoxContainer = payload.target // figure
                const imgg = imageFoxContainer.firstChild // identificamos la img
                const url = imgg.dataset.src // data del atributo
                //cargar img
                imgg.src = url; // nuestra imagen
                //unlisten
                observer.unobserve(imageFoxContainer)
            }
        )
    ...
```

los *atributos* `data-nameAttribure` sirven para definir **atributos personalizados** dentro de html, es decir, puedes inventarte atributos.

``` html
    <div
        id="myDiv"
        data-attribute="valor-del-atributo"
    > 
    </div>
```

La forma de acceder a estos elementos desde JavaScript es mediante la propiedad dataset, esta propiedad contiene la lista de todos los atributos personalizados que le pusiste a tu elemento:

``` js 
    const myAttribute = myDiv.dataset.attribute;
```

#### resultado

Finalmente le damos funcionalidad al botón clear, agregamos un wrapper a la imagen que nos permita mostrar que esta cargando y un estado del log que nos cuente las imagenes agregadas mas las imagenes cargadas.

``` js 
function logState () {
    console.log(`⚪️ Length Images: ${totalImages}`)
    console.log(`🟣 Loaded Images: ${loadedImages}`)
    console.log("---------------------------------")
}
```
