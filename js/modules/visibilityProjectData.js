import { projectData } from "./projectData.js";

const projectBody = document?.querySelector(".project__body");

export function visibilityProjectData(projectName, languageType) {
  if(!projectBody) return;
  let currentProject = projectData[projectName];

  const title = projectBody.querySelector(".project__title");
  const desc = projectBody.querySelector(".project__description");
  // const illustration = projectBody.querySelector(".project__illustration img");
  const screenshots = projectBody.querySelectorAll(".project__image img");
  const links = projectBody.querySelector('.project__btns');
  const linkToWebsite = projectBody.querySelector('.project__btn_website')
  const linkToApp = projectBody.querySelector('#projectApp')

  title.innerText = currentProject?.title[languageType];

  let modifiedDesc = currentProject?.description[languageType]?.split('');

  for(let i = 0; i < modifiedDesc?.length; i++) {
    if(modifiedDesc[i] == "\n") {
      modifiedDesc[i] = '<br><br>'
    } 
  }

  desc.innerHTML = modifiedDesc?.join('');

  // links

  linkToWebsite.href = currentProject?.links.toWebSite;

  if(currentProject?.links.toApplication === "") {
    linkToApp?.remove();
  } else {
    if(!linkToApp) {
      links.insertAdjacentHTML('beforeend', `<a href="${currentProject?.links.toApplication}" id="projectApp" class="btn btn_orange project__btn project__btn_app" target="_blank"
                      >App <img src="./img/project/arrow.svg" alt="arrow_right"
                    /></a>`)
    }
  }

  // images
  
  for(let i = 0; i < screenshots.length; i++) {
    screenshots[i].src = currentProject?.projectScreenshots[i].link;
  }
}
