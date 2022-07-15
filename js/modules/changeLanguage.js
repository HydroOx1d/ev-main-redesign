import { language } from "./language.js"

export function changeLanguage(type) {
  let currentLanguage = language[type];

  const header = document.querySelector('.header');
  const headerLinks = header.querySelectorAll(".nav__link");

  headerLinks.forEach((link, i) => {
    link.innerText = currentLanguage.header.links[i];
  })

  const presentSection = document.querySelector('.present');
  const presentTitle = presentSection.querySelector('.present__title');
  const presentButton = presentSection.querySelector('.present__btn');

  let {title: presentTitleValue, button: presentButtonValue} = currentLanguage.main.present;

  presentTitle.innerText = presentTitleValue;
  presentButton.innerText = presentButtonValue;


  const gotoDocumentsSection = document.querySelector('.goto-document');
  const gotoDocumentTitle = gotoDocumentsSection.querySelector('.goto-document__title');
  const gotoDocumentButton = gotoDocumentsSection.querySelector('.goto-document__btn');

  let { title: gotoDocumentTitleValue, button: gotoDocumentButtonValue } =
    currentLanguage.main.documents;

  gotoDocumentTitle.innerText = gotoDocumentTitleValue;
  gotoDocumentButton.innerText = gotoDocumentButtonValue;
}