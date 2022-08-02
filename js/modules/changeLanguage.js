import { language } from "./language.js"

export function changeLanguage(type) {
  let currentLanguage = language[type];

  const header = document?.querySelector('.header');
  const headerLinks = header?.querySelectorAll(".nav__link");
  
  headerLinks.forEach((link, i) => {
    link.innerText = currentLanguage?.header.links[i];
  })

  const presentSection = document?.querySelector('.present');
  const presentTitle = presentSection?.querySelector(".present__title");
  const presentButton = presentSection?.querySelector(".present__btn");

  if(presentTitle) presentTitle.innerText = currentLanguage?.main.present.title;
  if(presentButton) presentButton.innerText = currentLanguage?.main.present.button;


  const gotoDocumentsSection = document?.querySelector('.goto-document');
  const gotoDocumentTitle = gotoDocumentsSection?.querySelector('.goto-document__title');
  const gotoDocumentButton = gotoDocumentsSection?.querySelector('.goto-document__btn');

  if(gotoDocumentTitle) gotoDocumentTitle.innerText = currentLanguage?.main.documents.title;
  if(gotoDocumentButton) gotoDocumentButton.innerText = currentLanguage?.main.documents.button;

  // PROJECT LINKS

  const projectSection = document?.querySelector(".page__project");
  const projectLinksText = projectSection?.querySelectorAll(".item-nav-project__text");

  projectLinksText?.forEach((link, i) => {
    link.innerText = currentLanguage?.main.projects[i];
  })

  // DOCUMENTS PAGE

  const documentsPage = document?.querySelector(".page__documents");
  const documentsPageTitle = documentsPage?.querySelector(".documents__title");
  const documentItemTitle = documentsPage?.querySelectorAll(".item-document__title");
  const documentItemDownloadLink = documentsPage?.querySelectorAll('.item-document__download-text');

  if(documentsPageTitle) documentsPageTitle.innerText = currentLanguage?.documentsPage.title;

  if(documentItemTitle && documentItemDownloadLink) {
    documentItemTitle.forEach((item, i) => {
      item.innerText = currentLanguage?.documentsPage.itemTitle;
      documentItemDownloadLink[i].innerText =
        currentLanguage?.documentsPage.itemLink;
    });
  }
}