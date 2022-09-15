import { projectData } from "./projectData.js";

const projectContent = document?.querySelector(".project__content");

export function visibilityProjectData(languageType) {
  if (!projectContent) return;

  if(projectContent.children.length > 0) {
    projectContent.innerHTML = "";
  }

  projectData.forEach((data, index) => {
    let projectMarkup = `<div class="project__column">
              <div class="project__item">
                <h2 class="${`project__title ${index % 2 !== 0 ? "project__title--orange" : " "}`}">${data.title[languageType]}</h2>
                <p class="project__desc">${data.description[languageType]}</p>
                <div class="project__links">
                  ${data.links.toWebSite !== "" ? `<a href="${data.links.toWebSite}" target="_blank" class="${"btn " + (index % 2 !== 0 ? "btn_orange project__link--orange" : "project__link")}">Web-Site</a>` : ""}
                  ${data.links.toApplication !== "" ? `<a href="${data.links.toApplication}" target="_blank"
                    class="btn project__link project__link-app project__link--transparent">App
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.83333 3.33335L14.5 8.00002L9.83333 12.6667" stroke="#4478BB" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M14.5 8L2.5 8" stroke="#4478BB" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </a>` : ""}
                </div>
              </div>
            </div>`;

    projectContent.insertAdjacentHTML('beforeend', projectMarkup);
  })




}
