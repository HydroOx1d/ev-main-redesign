import { changeLanguage } from "./modules/changeLanguage.js";
import { visibilityProjectData } from "./modules/visibilityProjectData.js";
import { documentsData } from "./modules/documentsData.js";

let globalLanguageState;

// for initial set language

window.addEventListener("load", () => {
  let currentLanguage = localStorage.getItem("currentLanguageState");

  if (currentLanguage === null) {
    localStorage.setItem("currentLanguageState", "en");
  }

  globalLanguageState = localStorage.getItem("currentLanguageState");

  identifyLanguage(globalLanguageState)
  changeLanguage(globalLanguageState);
  visibilityProjectData(globalLanguageState);
  renderDocuments(globalLanguageState);
});

const headerLanguage = document.querySelector(".header__language");
const languageMenu = document.querySelector(".language__menu");

headerLanguage.addEventListener("click", () => {
  languageMenu.classList.toggle("_menu-is-active");
});

document.body.onclick = (e) => {
  if (e.target.closest(".header__language") !== headerLanguage) {
    languageMenu.classList.remove("_menu-is-active");
  }
};

// Dropdown

const currentLanguage = headerLanguage.querySelector(".language__current");
const languageItem = languageMenu.querySelectorAll(".language__item");

for (let i = 0; i < languageItem.length; i++) {
  let currentItem = languageItem[i];

  currentItem.addEventListener("click", (e) => {
    // Current Flag
    currentLanguage.querySelector(".language__flag").src =
      e.target.querySelector("img").src;
    // Current Text
    currentLanguage.querySelector(".language__text").innerText =
      e.target.innerText;

    globalLanguageState = e.target.dataset.language;

    localStorage.setItem("currentLanguageState", globalLanguageState);

    changeLanguage(globalLanguageState);

    visibilityProjectData(globalLanguageState);

    renderDocuments(globalLanguageState);
  });
}

function identifyLanguage(langType) {
  const identifiedLanguage = document?.getElementById(langType)

  // Current Flag
  currentLanguage.querySelector(".language__flag").src =
    identifiedLanguage?.querySelector("img").src;
  // Current Text
  currentLanguage.querySelector(".language__text").innerText =
    identifiedLanguage?.textContent.trim();
}

// Documents
function sliceText(str) {
  if (typeof str !== 'string') {
    throw new Error('Not string')
  }
  const maxLength = 30;
  const resultString = [];
  const sliceParamString = str.split(" ");
  let i = 0;

  while (true) {
    if (i === sliceParamString.length - 1) break;
    resultString.push(sliceParamString[i]);
    if (resultString.join(" ").length >= maxLength) {
      return resultString.join(" ") + "...";
    }
    i++;
  }

  return str;
}

function renderDocuments(lang) {
  const documentsList = document?.querySelector(".documents__list");
  const documentContent = document?.querySelector('.document__content');

  if (documentsList?.children.length > 0) {
    documentsList.innerHTML = "";
  }
  if (documentContent?.children.length > 0) {
    documentContent.innerHTML = "";
  }

  documentsData.forEach((document, index) => {
    let documentMarkup = `
              <div class="document__col">
                <div class="document__col-iblock">
                  <img src="./img/documents-img/doc-img.jpg" alt="" class="document__col-img">
                  <a href="${document.link[lang]}" download class="document__col-button">
                    <svg class="document__col-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H5"
                        stroke="current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15 14L12 17L9 14" stroke="current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M15 9L12 12L9 9" stroke="current" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M12 12V3" stroke="current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
                <h2 class="document__col-title">${document.name[lang]}</h2>
              </div>
    `;
    documentsList?.insertAdjacentHTML("beforeend", documentMarkup);
    if (index < 4) {
      documentContent?.insertAdjacentHTML("beforeend", documentMarkup)
    }
  });

  documentsCutTitle()
}

function documentsCutTitle() {
  const cols = document.querySelectorAll('.document__col');
  const colTitles = document.querySelectorAll(".document__col-title");
  const cache = new Map();

  cols.forEach((col, i) => {


    if (!cache.has(i)) {
      cache.set(i, colTitles[i].innerHTML);
    }

    col.addEventListener('mouseenter', () => {
      colTitles[i].innerHTML = cache.get(i);
      if (colTitles[i].innerHTML.length >= 40) {
        colTitles[i].classList.add('_is-hovered')
      }
    })

    col.addEventListener('mouseleave', () => {
      colTitles[i].innerHTML = sliceText(cache.get(i));
      colTitles[i].classList.remove('_is-hovered')
    })


    colTitles[i].innerHTML = sliceText(colTitles[i].innerHTML);

  })
}

documentsCutTitle()