const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElementId = `#${inputElement.id}-error`;

  const errorMessageElement = formElement.querySelector(errorElementId);

  inputElement.classList.add(config.inputErrorClass);
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElementId = `#${inputElement.id}-error`;
  const errorMessageElement = formElement.querySelector(errorElementId);
  inputElement.classList.remove(config.inputErrorClass);
  errorMessageElement.classList.remove(config.errorClass);
  errorMessageElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};
const resetValidation = (formEl, config) => {
  // Step 1: Find all inputs in the form
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));

  // Step 2: Find the submit button
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  // Step 3: Cleans it
  inputList.forEach((inputElement) => {
    // Remove error styling from input
    hideInputError(formEl, inputElement, config);
  });

  // Step 4: Reset submit button state
  toggleButtonState(inputList, buttonElement, config);
};
enableValidation(settings);
