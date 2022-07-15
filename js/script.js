const hamburger = document.querySelector(".hamburger");
const headerNavigation = document.querySelector(".header__nav");
const headerLanguage = document.querySelector(".header__language");
const languageMenu = document.querySelector(".language__menu");

hamburger.addEventListener("click", () => {
  if (!hamburger.classList.contains("is-active")) {
    hamburger.classList.add("is-active");
    headerNavigation.classList.add("_nav-is-active");
    headerLanguage.style.display = 'block';
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
  if (
    e.target.closest(".header__language") !== headerLanguage
  ) {
    languageMenu.classList.remove("_menu-is-active");
  }
}