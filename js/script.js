import { changeLanguage } from "./modules/changeLanguage.js";
import { visibilityProjectData } from "./modules/visibilityProjectData.js";
import { imageModal } from "./modules/imagesModal.js";
import { documentsData } from "./modules/documentsData.js";

let globalLanguageState;
let inititalProjectData;

// for initial set language

window.addEventListener("load", () => {
  let currentLanguage = localStorage.getItem("currentLanguageState");

  if (currentLanguage === null) {
    currentLanguage = localStorage.setItem("currentLanguageState", "en");
  }

  globalLanguageState = localStorage.getItem("currentLanguageState");
  inititalProjectData = "stock";

  changeLanguage(globalLanguageState);
  visibilityProjectData(inititalProjectData, globalLanguageState);
  renderDocuments(globalLanguageState);
});

const hamburger = document.querySelector(".hamburger");
const headerNavigation = document.querySelector(".header__nav");
const headerLanguage = document.querySelector(".header__language");
const languageMenu = document.querySelector(".language__menu");

hamburger.addEventListener("click", () => {
  if (!hamburger.classList.contains("is-active")) {
    hamburger.classList.add("is-active");
    headerNavigation.classList.add("_nav-is-active");
    headerLanguage.style.display = "block";
    document.body.style.overflow = "hidden";
    document.querySelector(".header").style.backgroundColor = "#fff";
    document.querySelector(".header").style.position = "static";
  } else {
    hamburger.classList.remove("is-active");
    headerNavigation.classList.remove("_nav-is-active");
    headerLanguage.style.display = "none";
    document.body.style.overflow = "auto";
    document.querySelector(".header").style.backgroundColor = "transparent";
    document.querySelector(".header").style.position = "absolute";
  }
});

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

    visibilityProjectData(inititalProjectData, globalLanguageState);

    renderDocuments(globalLanguageState);
  });
}

// PROJECTS

const projectNavItem = document.querySelectorAll(".project__nav-item");
const projectBody = document.querySelector(".project__body");

let activeNav = 0;

for (let i = 0; i < projectNavItem.length; i++) {
  let current = projectNavItem[i];

  projectNavItem[activeNav].classList.add("_is-active");

  current.addEventListener("click", (e) => {
    if (i !== activeNav) {
      projectNavItem[activeNav].classList.remove("_is-active");
    }

    activeNav = i;

    projectNavItem[activeNav].classList.add("_is-active");

    inititalProjectData = current.dataset.project;

    visibilityProjectData(inititalProjectData, globalLanguageState);

    projectBody.classList.add("_visible-with-opacity");

    setTimeout(() => {
      projectBody.classList.remove("_visible-with-opacity");
    }, 500);
  });
}

// -- images

const projectImages = document.querySelector(".project__images");
const projectImageLg = document.querySelector(".project__images_lg");

if (projectImages && projectImageLg) {
  if (window.innerWidth < 1100) {
    let outProjectImages = projectImages;
    projectImageLg.innerHTML = outProjectImages.outerHTML;
    projectImages.remove();
  }
}

const projectImage = projectBody?.querySelectorAll(".project__image img");
let imgSrc;

function openModalImage(e) {
  console.log(e);
  imgSrc = e.target.src;

  imageModal(imgSrc);
}

for (let i = 0; i < projectImage?.length; i++) {
  let currentImage = projectImage[i];

  currentImage.addEventListener("click", openModalImage);
  // currentImage.addEventListener("touchstart", openModalImage);
}

document.body.onclick = function (e) {
  if (e.target === e.target.closest(".modal")) {
    document.querySelector(".modal").remove();
  }
};

const footerColumns = document.querySelectorAll(".footer__column");

if (footerColumns) {
  if (window.innerWidth < 768 && window.innerWidth > 576) {
    let footerColumn1 = footerColumns[3].outerHTML;
    footerColumns[3].outerHTML = footerColumns[1].outerHTML;
    footerColumns[1].outerHTML = footerColumn1;
  }
}

// Documents
function sliceText(str) {
  if (typeof str !== 'string') {
    throw new Error('Not string')
  }
  const maxLength = 40;
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

const cols = document.querySelectorAll('.document__col');
const colTitles = document.querySelectorAll(".document__col-title");

const cache = new Map();

cols.forEach((col, i) => {


  if (!cache.has(i)) {
    cache.set(i, colTitles[i].innerHTML);
  }

  col.addEventListener('mouseenter', () => {
    colTitles[i].innerHTML = cache.get(i);
    colTitles[i].classList.add('_is-hovered')
  })

  col.addEventListener('mouseleave', () => {
    colTitles[i].innerHTML = sliceText(cache.get(i));
    colTitles[i].classList.remove('_is-hovered')
  })


  colTitles[i].innerHTML = sliceText(colTitles[i].innerHTML);

})

function renderDocuments(lang) {
  const documentsList = document?.querySelector(".documents__list");

  if (documentsList?.children.length > 0) {
    documentsList.innerHTML = "";
  }

  if (!documentsList) {
    return false;
  }

  documentsData.forEach((document) => {
    let documentMarkup = `
              <article class="documents__item item-document">
                <div class="item-document__title-block">
                  <div class="item-document__title">${document.name[lang]}</div>
                </div>
                <a
                  href="${document.link}"
                  download
                  target="_blank"
                  class="item-document__download"
                  ><img
                    src="./img/documents-img/download.svg"
                    alt="download_file" />
                  <span class="item-document__download-text">Download</span
                ></a>
              </article>
    `;
    documentsList.insertAdjacentHTML("beforeend", documentMarkup);
  });
}