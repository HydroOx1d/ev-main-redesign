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
    document.querySelector('.header').style.backgroundColor = '#fff';
    document.querySelector('.header').style.position = 'static';

  } else {
    hamburger.classList.remove("is-active");
    headerNavigation.classList.remove("_nav-is-active");
    headerLanguage.style.display = "none";
    document.body.style.overflow = "auto";
    document.querySelector('.header').style.backgroundColor = 'transparent';
    document.querySelector('.header').style.position = 'absolute';
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
import { changeLanguage } from "./modules/changeLanguage.js";

const currentLanguage = headerLanguage.querySelector('.language__current');
const languageItem = languageMenu.querySelectorAll('.language__item');

// for initial set language
let globalLanguageState;
let inititalProjectData;

for(let i = 0; i < languageItem.length; i++) {
  let currentItem = languageItem[i];

  currentItem.addEventListener('click', (e) => {
    // Current Flag
    currentLanguage.querySelector(".language__flag").src = e.target.querySelector('img').src;
    // Current Text
    currentLanguage.querySelector(".language__text").innerText = e.target.innerText;

    globalLanguageState = e.target.dataset.language;

    localStorage.setItem("currentLanguageState", globalLanguageState);

    changeLanguage(globalLanguageState);

    visibilityProjectData(inititalProjectData, globalLanguageState);
  })
}

// PROJECTS
import { visibilityProjectData } from "./modules/visibilityProjectData.js";

const projectNavItem = document.querySelectorAll(".project__nav-item");
const projectBody = document.querySelector('.project__body')

let activeNav = 0;

for (let i = 0; i < projectNavItem.length; i++) {
  let current = projectNavItem[i];

  projectNavItem[activeNav].classList.add("_is-active");
  
  current.addEventListener("click", (e) => {
    if(i !== activeNav) {
      projectNavItem[activeNav].classList.remove('_is-active')
    }

    activeNav = i;

    projectNavItem[activeNav].classList.add('_is-active')

    inititalProjectData = current.dataset.project;

    visibilityProjectData(inititalProjectData, globalLanguageState);

    projectBody.classList.add("_visible-with-opacity");

    setTimeout(() => {
      projectBody.classList.remove("_visible-with-opacity");
    }, 500)
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let currentLanguage = localStorage.getItem('currentLanguageState');
  if(currentLanguage === null) {
    currentLanguage = localStorage.setItem("currentLanguageState", "en");
  }
  globalLanguageState = currentLanguage;
  inititalProjectData = 'stock';
  changeLanguage(currentLanguage);
  visibilityProjectData(inititalProjectData, globalLanguageState);
})


// -- images
import { imageModal } from './modules/imagesModal.js';

const projectImage = projectBody?.querySelectorAll('.project__image img');
let imgSrc;

if(projectImage) {
  for (let i = 0; i < projectImage.length; i++) {
    let currentImage = projectImage[i];

    currentImage.addEventListener("click", (e) => {
      imgSrc = e.target.src;

      imageModal(imgSrc);
    });
  }
}

const projectImages = document.querySelector('.project__images');
const projectImageLg = document.querySelector('.project__images_lg');


if(projectImages && projectImageLg) {
  if(window.innerWidth < 1100) {
    let outProjectImages = projectImages;
    projectImageLg.innerHTML = outProjectImages.outerHTML;
    projectImages.remove()
  }
}

 
document.body.onclick = function(e) {
  if(e.target === e.target.closest('.modal')) {
    document.querySelector('.modal').remove()
  }
}

const footerColumns = document.querySelectorAll('.footer__column');

if(footerColumns) {
  if (window.innerWidth < 768 && window.innerWidth > 576) {
    let footerColumn1 = footerColumns[3].outerHTML;
    footerColumns[3].outerHTML = footerColumns[1].outerHTML;
    footerColumns[1].outerHTML = footerColumn1;
  }
}