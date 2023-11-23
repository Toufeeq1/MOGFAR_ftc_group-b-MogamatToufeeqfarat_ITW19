/*
 * used for making books show
 */

import { books, genres, authors, BOOKS_PER_PAGE } from "./data.js";

const matches = books;

let page = 1;

const fragment = document.createDocumentFragment();
let extracted = books.slice(0, BOOKS_PER_PAGE);

if (!books && !Array.isArray(books)) {
  throw new Error("Source required");
}

if (!matches && matches.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

const createPreview = (props) => {
  const { author, id, image, title } = props;

  const element = document.createElement("button");
  element.classList.add("preview");
  element.dataset.preview = id;
  element.innerHTML = /* html */ `
    <img 
        class="preview__image" 
        src="${image}" 
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
    `;

  return element;
};

for (const booksIndex of extracted) {
  const preview = createPreview(booksIndex);
  fragment.appendChild(preview);
}

document.querySelector("[data-list-items]").appendChild(fragment);

/**
 * genres selection in search
 * ****************************************/

const genresFragment = document.createDocumentFragment();
const genresOption = document.createElement("option");
genresOption.value = "any";
genresOption.innerText = "All Genres";
genresFragment.appendChild(genresOption);

for (const [id] of Object.entries(genres)) {
  const genresOption = document.createElement("option");
  genresOption.value = id;
  genresOption.innerText = genres[id];
  genresFragment.appendChild(genresOption);
}

document.querySelector("[data-search-genres]").appendChild(genresFragment);

/************************************************************************************** */

/************************************************ authors for the search bar  ***********/

const authorsFragment = document.createDocumentFragment();
const authorsElement = document.createElement("option"); //element to contain loop content
authorsElement.value = "any";
authorsElement.innerText = "All Authors";
authorsFragment.appendChild(authorsElement);

for (const [id] of Object.entries(authors)) {
  const authorsElement = document.createElement("option");
  authorsElement.value = id;
  authorsElement.innerText = authors[id];
  authorsFragment.appendChild(authorsElement);
}

const dataSearchAuthors = document
  .querySelector("[data-search-authors]")
  .appendChild(authorsFragment);

/****************************************************************************************************** */

/************************************** color fixing  ********************/
const css = {
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
};

const showmoreButton = document.querySelector("[data-list-button]");

const settingsButton = document.querySelector("[data-header-settings]");

document.querySelector("[data-settings-theme]").value =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "day"
    : "night";
let v =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "day"
    : "night";

document.documentElement.style.setProperty("--color-dark", css[v].dark); //The document.documentElement property selects you the html element (root element)
document.documentElement.style.setProperty("--color-light", css[v].light);

const settingsCancel = document.querySelector("[data-settings-cancel]");
const settings = document.querySelector("[data-settings-overlay]");

const updateRemaining = () => {
  const remaining = books.length - BOOKS_PER_PAGE * page;
  return remaining;
};

const remaining = matches.length - page * BOOKS_PER_PAGE;
showmoreButton.innerHTML = /* HTML */ `
  <span>Show more</span>
  <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
`;

const showSettings = (event) => {
  event.preventDefault();
  settings.showModal();

  settingsCancel.addEventListener("click", () => {
    settings.close();
  });
};

settingsButton.addEventListener("click", showSettings);

/************************************** it addeds the show more  button ***************************/
/*this code handles the event triggered by clicking a "Show more" button.
 It increments the page number, calculates the range of books to be displayed,
  and updates the extracted array. If there are remaining books, it generates 
  preview elements for each book, appends them to the document fragment, and 
  attaches event listeners to the preview elements. Finally, it updates the content of the showmoreButton
*/
const showMore = (event) => {
  event.preventDefault();
  page += 1;
  const remaining = updateRemaining();
  const hasRemaining = remaining > 0 ? remaining : 0;

  const rangeStart = (page - 1) * BOOKS_PER_PAGE;
  const rangeEnd = books.length - remaining;
  extracted = books.slice(rangeStart, rangeEnd);

  if (hasRemaining > 0) {
    for (const booksIndex of extracted) {
      const preview = createPreview(booksIndex);
      fragment.appendChild(preview);
    }

    document.querySelector("[data-list-items]").appendChild(fragment);

    const previewList = document.querySelectorAll(".preview");
    const previewArray = Array.from(previewList);
    for (const preview of previewArray) {
      preview.addEventListener("click", activePreview);
    }
  }

  showmoreButton.innerHTML = /* html */ `
    <span>Show more </span>
    <span class="list__remaining">
        (${hasRemaining})
    </span>
    `;
};

showmoreButton.addEventListener("click", showMore);

/****************************************************** *******************************************/

/********************** this is so that the search items button works **********************************************/

const optionsButton = document.querySelector("[data-header-search]");
const optionsMenu = document.querySelector("[data-search-overlay]");
const optionsCancel = document.querySelector("[data-search-cancel]");

const showOptionsMenu = (event) => {
  // event listerner for formsubmit
  event.preventDefault();
  optionsMenu.showModal();

  optionsCancel.addEventListener("click", () => {
    // event
    optionsMenu.close();
  });
};

optionsButton.addEventListener("click", showOptionsMenu);

const datasearchButton = document.querySelector(
  '[data-search-overlay] [type="submit"]'
);
const dataSearchForm = document.querySelector("[data-search-form]");

dataSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  /**
   * The for loop checks if any of the filters matches with the books and
   * if its true the book gets pushed to the result array .
   */
  for (const book of books) {
    const titleMatch =
      filters.title.trim() !== "" &&
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    const genreMatch =
      filters.genre !== "any" && book.genres.includes(filters.genre);
    const authorMatch =
      filters.author !== "any" && book.author.includes(filters.author);

    if (titleMatch || authorMatch || genreMatch) {
      result.push(book);
    }
  }
  const dataListItems = document.querySelector("[data-list-items]");
  const dataListButton = document.querySelector("[data-list-button]");
  const dataListMessage = document.querySelector("[data-list-message]");

  let page = 1;
  /**
   * This if statement checks the result array and the result length is equal to 0 none
   * of the books will be displayed and the "Show More" button will be disabled. Else if
   * the result length is not equal to 0, the list of previews are created and displayed
   * on the page.
   */
  if (result.length === 0) {
    dataListItems.innerHTML = "";
    showmoreButton.disabled = true;
    dataListMessage.classList.add("list__message_show");

    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
  } else {
    dataListMessage.classList.remove("list__message_show");
    dataListItems.innerHTML = "";

    const searchStartIndex = (page - 1) * BOOKS_PER_PAGE;
    const searchEndIndex = searchStartIndex + BOOKS_PER_PAGE;

    const searchBookFragment = document.createDocumentFragment();
    const searchBookExtracted = result.slice(searchStartIndex, searchEndIndex);

    /**
     * This loop iterates over the book previews to display on the current page,
     * creates a book preview button using the createPreview function, and
     * appends the button to the bookFragment container
     */
    for (const preview of searchBookExtracted) {
      const showPreview = createPreview(preview);
      searchBookFragment.appendChild(showPreview);
    }

    dataListItems.appendChild(searchBookFragment);
    // dataSearchForm.close();

    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;

    dataListButton.disabled = remaining <= 0;

    /**
     * This sets up a click event listener for the "Show More" button. When clicked,
     * the code executes the logic to display the next set of book previews.
     */
    dataListButton.addEventListener("click", () => {
      page++;

      const moreSearchStartIndex = (page - 1) * BOOKS_PER_PAGE;
      const moreSearchEndIndex = moreSearchStartIndex + BOOKS_PER_PAGE;

      const moreSearchBookExtracted = result.slice(
        moreSearchStartIndex,
        moreSearchEndIndex
      );

      const moreSearchBookFragment = document.createDocumentFragment();

      for (const preview of moreSearchBookExtracted) {
        const showPreview = createPreview(preview);
        moreSearchBookFragment.appendChild(showPreview);
      }

      dataListItems.appendChild(moreSearchBookFragment);

      const remaining = result.length - page * BOOKS_PER_PAGE;
      dataListButton.innerHTML = /* HTML */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
      `;

      dataListButton.disabled = remaining <= 0;
    });

  }

  window.scrollTo({ top: 0, behavior: "smooth" });

//   alert("button was clicked");

  optionsMenu.close();
  dataSearchForm.reset();
});

/*****************************************************  ********************************************/

const settingsSave = document.querySelector(
  '[data-settings-overlay] [type="submit"]'
);
const settingsData = document.querySelector("[data-settings-form]");

const saveTheme = (event) => {
  event.preventDefault();
  const formData = new FormData(settingsData);
  const result = Object.fromEntries(formData);

  document.documentElement.style.setProperty(
    "--color-dark",
    css[result.theme].dark
  );
  document.documentElement.style.setProperty(
    "--color-light",
    css[result.theme].light
  );

  settings.close();
};

settingsSave.addEventListener("click", saveTheme);

const summary = document.querySelector("[data-list-active]");
const summaryClose = document.querySelector("[data-list-close]");
const summaryBackground = document.querySelector("[data-list-blur]");
const summaryImage = document.querySelector("[data-list-image]");
const summaryTitle = document.querySelector("[data-list-title]");
const summarySubtitle = document.querySelector("[data-list-subtitle]");
const summaryDescription = document.querySelector("[data-list-description]");

const activePreview = (event) => {
  event.preventDefault();
  let active;

  const bookPreview = event.target.closest(".preview");
  const bookPreviewId = bookPreview.getAttribute("data-preview");

  for (const book of books) {
    if (active) break;

    if (book.id === bookPreviewId) {
      active = book;
    }
  }

  if (!active) return;

  const { title, image, description, published, author } = active;
  summary.showModal();
  summaryBackground.src = image;
  summaryImage.src = image;
  summaryTitle.innerText = title;
  summarySubtitle.innerText = `${authors[author]} (${new Date(
    published
  ).getFullYear()})`;
  summaryDescription.innerText = description;

  summaryClose.addEventListener("click", () => {
    summary.close();
  });
};

const previewList = document.querySelectorAll(".preview");
const previewArray = Array.from(previewList);
for (const preview of previewArray) {
  preview.addEventListener("click", activePreview);
}

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

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }
