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
  } else {
    hamburger.classList.remove("is-active");
    headerNavigation.classList.remove("_nav-is-active");
    headerLanguage.style.display = "none";
    document.body.style.overflow = "auto";
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

for(let i = 0; i < languageItem.length; i++) {
  let currentItem = languageItem[i];

  currentItem.addEventListener('click', (e) => {
    // Current Flag
    currentLanguage.querySelector(".language__flag").src = e.target.querySelector('img').src;
    // Current Text
    currentLanguage.querySelector(".language__text").innerText = e.target.innerText;
    changeLanguage(e.target.dataset.language);
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

    visibilityProjectData(current.dataset.project)

    projectBody.classList.add("_visible-with-opacity");

    setTimeout(() => {
      projectBody.classList.remove("_visible-with-opacity");
    }, 400)
  });
}

window.addEventListener('load', () => {
  visibilityProjectData('stock')
})


// -- images
import { imageModal } from './modules/imagesModal.js';

const projectImages = projectBody.querySelectorAll('.project__image img');
let imgSrc;

for(let i = 0; i < projectImages.length; i++) {
  let currentImage = projectImages[i];

  currentImage.addEventListener('click', (e) => {
    imgSrc = e.target.src;

    imageModal(imgSrc);
  })
}
