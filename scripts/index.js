const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfiledescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");

const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const profileNameElement = document.querySelector(".profile__name");

const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfiledescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});
editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});
newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfiledescriptionInput.value;
  closeModal(editProfileModal);
}

// trying things out //

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const addCardFormElement = newPostModal.querySelector(".modal__form");

const nameInput = addCardFormElement.querySelector("#caption-input");
const linkInput = addCardFormElement.querySelector("#card-image-input");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log("Post title:", nameInput.value);
  console.log("Post link:", linkInput.value);

  closeModal(newPostModal);
}
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
