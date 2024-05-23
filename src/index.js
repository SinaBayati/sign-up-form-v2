import "./styles.css";

function isEmpty(element){
  if (element.value.trim() === "") {
    return true;
  }
}

function isPasswordSame(passwordEl,confirmPasswordEl){
  if (passwordEl.value === confirmPasswordEl.value) {
    return true;
  }
}

function validatePassword(passwordEl){
  // password must not contain whitespace
  if (passwordEl.value.trim() !== passwordEl.value){
    return false;
  }
  if (passwordEl.value.length < 8) {
    return false;
  }
  return true;
}

function validateZipCode(zipCodeEl){
  if (zipCodeEl.value.length === 10){
    return true;
  }
}

function isEmailValid(emailEl){
  if (emailEl.validity.typeMismatch) {
    return false;
  }
  return true;
}

const emailInput = document.querySelector("#email");

function emailInputHandler(event){
  const target = event.target;
  let message = "Valid";

  const isValid = (
    isEmailValid(target) && !isEmpty(target)
  );

  if (!isEmailValid(target)) {
    message = "Invalid email address";
  } else if (isEmpty(target)) {
    message = "This field must not be empty";
  }

  if (isValid) {
    statusValidHandler(message,target);
  } else {
    statusInvalidHandler(message,target);
  }
}

emailInput.addEventListener("input",emailInputHandler);

function statusValidHandler(message,inputElement){
  const outputEl = inputElement.nextElementSibling;
  const labelEl = inputElement.previousElementSibling;

  outputEl.textContent = message;
  outputEl.classList.remove("active");
  labelEl.classList.remove("active");
  inputElement.classList.remove("active");
}

function statusInvalidHandler(errorMessage,inputElement){
  const outputEl = inputElement.nextElementSibling;
  const labelEl = inputElement.previousElementSibling;

  outputEl.textContent = errorMessage;
  outputEl.classList.add("active");
  labelEl.classList.add("active");
  inputElement.classList.add("active");
}

const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const countryInput = document.querySelector("#country");
const zipCodeInput = document.querySelector("#zip-code");
const submitBtn = document.querySelector("button[type='submit']");
