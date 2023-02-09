import { language } from "./language.js";

export function changeLanguage(type) {
  let currentLanguage = language[type];

  const header = document?.querySelector(".header");
  const headerLinks = header?.querySelectorAll(".nav__link");

  headerLinks.forEach((link, i) => {
    link.innerText = currentLanguage?.header.links[i];
  });

  const presentSection = document?.querySelector(".present");
  const presentTitle = presentSection?.querySelector(".present__title");
  const presentButton = presentSection?.querySelector(".present__btn");

  if (presentTitle)
    presentTitle.innerText = currentLanguage?.main.present.title;
  if (presentButton)
    presentButton.innerText = currentLanguage?.main.present.button;

  const gotoDocumentsSection = document?.querySelector(".goto-document");
  const gotoDocumentTitle = gotoDocumentsSection?.querySelector(
    ".document__title"
  );

  if (gotoDocumentTitle)
    gotoDocumentTitle.innerText = currentLanguage?.main.documents.title;

  // DOCUMENTS PAGE

  const documentsPage = document?.querySelector(".page__documents");
  const documentsPageTitle = documentsPage?.querySelector(".documents__title");

  if (documentsPageTitle)
    documentsPageTitle.innerText = currentLanguage?.documentsPage.title;

  // FOOTER

  const footerNavTitles = document?.querySelectorAll('.column-footer-nav__title');
  const footerNavLinks = document?.querySelectorAll('.column-footer-nav__link');
  const subFooterAlert = document?.querySelector('.sub-footer__text');

  footerNavTitles.forEach((title, index) => {
    title.innerText = currentLanguage?.footer.navTitle[index];
  })

  footerNavLinks.forEach((link, index) => {
    link.innerText = currentLanguage?.footer.navLink[index];
  })

  subFooterAlert.innerText = currentLanguage?.footer.warning;
}
