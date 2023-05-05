import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js"; 

const matches = books

const page = 1;


if (!matches && !Array.isArray(books)) throw new Error('Source required') 
if (!matches && matches.length < 2) throw new Error('Range must be an array with two numbers')

// day = {
//     dark: '10, 10, 20',
//     light: '255, 255, 255',
// }
//       //both of these are for colours
// night = {
//     dark: '255, 255, 255',
//     light: '10, 10, 20',
// }

const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36) //books are in a large array
//console.log(extracted);
for (let i =0; matches[i]<extracted.length-1; i++ ) {
    const preview = createPreview({
        authors,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

const dataListItems = document.querySelector(`[data-list-items]`).appendChild(fragment)


const genresElement = document.createDocumentFragment()
const bookElement = document.createElement('option')
bookElement.value = 'any'
bookElement.innerText = 'All Genres'
genresElement.appendChild(bookElement)


for ( const { id, name } of Object.entries(genres) ) { //extracts [id, name] from genres, which has been turned into an object through (Object.entries); the values of id and name are then used in the loop
    const bookElement = document.createElement('option')
    bookElement.value = id
    bookElement.innerText = name
    genresElement.appendChild(bookElement) //nothing given
}
const dataSearchGenres = document.querySelector(`[data-search-genres]`).appendChild(genresElement)
              //console.log(dataSearchGenres)





const authorsElement = document.createDocumentFragment()
const bookElementSecond = document.createElement('option')
bookElementSecond.value = 'any'
bookElementSecond.innerText = 'All Authors'
authorsElement.appendChild(bookElementSecond)


for ( const [id, name] of Object.entries(authors)) {
   const bookElement = document.createElement('option')
    bookElement.value = id
    bookElement.innerText = name
    authorsElement.appendChild(bookElement)
}
const dataSearchAuthors = document.querySelector('[data-search-authors]').appendChild(authorsElement)
console.log(dataSearchAuthors)

const dataSettingTheme = document.querySelector('[data-settings-theme]')

dataSettingTheme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'



// dataSettingTheme.style.setProperty('--color-dark', css[v].dark); //css error thats why i comment it out
// dataSettingTheme.style.setProperty('--color-light', css[v].light);

const dataListButton = document.querySelector(`[data-line-button]`)

if(matches.length - [BOOKS_PER_PAGE]<= 0){
dataListButton.disabled 
} else {
dataListButton.innerHTML = /* html */ [
    `<span>Show more</span>
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`
]
}





// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// // data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

    // for (let { author, image, title, id } of extracted[i]) {
    //     const { author: authorId, id, image, title } = props

    //     const infoelement = document.createElement('button')
    //     infoelement.classList = 'preview'
    //     infoelement.setAttribute('data-preview', id)

    //     element.innerHTML = /* html */ `
    //         <img
    //             class="preview__image"
    //             src="${image}"
    //         />
            
    //         <div class="preview__info">
    //             <h3 class="preview__title">${title}</h3>
    //             <div class="preview__author">${authors[authorId]}</div>
    //         </div>
    //     `

    //     fragment.appendChild(element)
    // }
    
// //     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
