import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import "./index.css";

import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6fb6f70f-7d43-442f-81ec-2d651a2528d3",
    "Content-Type": "application/json",
  },
});

const allModals = document.querySelectorAll(".modal");
const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description",
);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const captionInputElement = addCardFormElement.querySelector("#caption-input");
const inputUrlElement = addCardFormElement.querySelector("#card-image-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewTitleElement = previewModal.querySelector(".modal__caption");
const cardTemplate = document.querySelector("#card-template");

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close");
const deleteForm = document.querySelector("#delete-form");
const cancelDeleteButton = deleteModal.querySelector(".modal__button");

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalCloseButton = avatarModal.querySelector(".modal__close");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = avatarForm.querySelector("#avatar-input");
const profileAvatarElement = document.querySelector(".profile__avatar");
const avatarButton = document.querySelector(".profile__avatar-button");

let selectedCard;
let selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editProfileForm, settings);
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
  const submitButton = editProfileForm.querySelector(".modal__submit-button");
  renderLoading(true, submitButton);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userData) => {
      profileNameElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitButton));
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const cardsList = document.querySelector(".cards__list");

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  const cardDeleteButtonElement = cardElement.querySelector(
    ".card__delete-button",
  );

  if (data.isLiked) {
    cardLikeButtonElement.classList.add("card__like-button_active");
  }

  cardLikeButtonElement.addEventListener("click", () => {
    const isLiked = cardLikeButtonElement.classList.contains(
      "card__like-button_active",
    );

    if (isLiked) {
      api
        .unlikeCard(data._id)
        .then(() => {
          cardLikeButtonElement.classList.remove("card__like-button_active");
        })
        .catch(console.error);
    } else {
      api
        .likeCard(data._id)
        .then(() => {
          cardLikeButtonElement.classList.add("card__like-button_active");
        })
        .catch(console.error);
    }
  });

  cardDeleteButtonElement.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewTitleElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardFormElement.querySelector(
    ".modal__submit-button",
  );
  renderLoading(true, submitButton);
  api
    .addCard({
      name: captionInputElement.value,
      link: inputUrlElement.value,
    })
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      evt.target.reset();
      resetValidation(addCardFormElement, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitButton));
}
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

allModals.forEach((modal) =>
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
  }),
);

deleteModalCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

cancelDeleteButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = deleteForm.querySelector(".modal__submit-button");
  renderLoading(true, submitButton, "Yes, delete");
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitButton, "Yes, delete"));
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileAvatarElement.src = userData.avatar;

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);
avatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".modal__submit-button");
  renderLoading(true, submitButton);
  api
    .updateAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatarElement.src = userData.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
      submitButton.disabled = true;
      submitButton.classList.add("modal__submit-button_disabled");
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitButton));
});

function renderLoading(isLoading, button, defaultText = "Save") {
  if (isLoading) {
    button.textContent = "Saving...";
  } else {
    button.textContent = defaultText;
  }
}
enableValidation(settings);
