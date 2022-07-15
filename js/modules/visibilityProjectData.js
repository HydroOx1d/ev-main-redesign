import { projectData } from "./projectData.js";

const projectBody = document.querySelector(".project__body");

export function visibilityProjectData(projectName) {
  let currentProject = projectData[projectName];

  const title = projectBody.querySelector(".project__title");
  const desc = projectBody.querySelector(".project__description");
  const screenshots = projectBody.querySelectorAll(".project__image img");

  title.innerText = currentProject.title;

  desc.innerText = currentProject.description;

  // images
  
  for(let i = 0; i < screenshots.length; i++) {
    screenshots[i].src = currentProject.projectScreenshots[i].link;
  }
}
