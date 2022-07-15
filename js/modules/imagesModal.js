export function imageModal(imageSrc) {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  //add the modal to the main section or the parent element
  document.querySelector(".wrapper").append(modal);
  //adding image to modal
  const newImage = document.createElement("img");
  newImage.setAttribute("src", imageSrc);
  modal.append(newImage);
  //creating the close button
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "fas fa-times closeBtn");
  closeBtn.innerHTML = "&times;"
  //close function
  closeBtn.onclick = () => {
    modal.remove();
  };
  modal.append(newImage, closeBtn);
}
