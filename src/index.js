import "./styles.css";

let isFormValid = false;

function isEmpty(element){
  if (element.value.trim() === "") {
    return true;
  }
  return false;
}

function isPasswordSame(passwordEl,confirmPasswordEl){
  if (passwordEl.value === confirmPasswordEl.value) {
    return true;
  }
  return false
}

function validatePassword(passwordEl){
  const password = passwordEl.value;
  if (password.length < 8 && password.length > 0) {
    return false;
  }
  return true;
}

function validateZipCode(zipCodeEl){
  const zipCodeRegex = /^\d{10}$/;

  if (zipCodeRegex.test(zipCodeEl.value)){
    return true;
  }
  return false;
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
  
  isFormValid = true;
}

function statusInvalidHandler(errorMessage,inputElement){
  const outputEl = inputElement.nextElementSibling;
  const labelEl = inputElement.previousElementSibling;

  outputEl.textContent = errorMessage;
  outputEl.classList.add("active");
  labelEl.classList.add("active");
  inputElement.classList.add("active");

  isFormValid = false;
}

const passwordInput = document.querySelector("#password");

function passwordInputHandler(event){
  const target = event.target;

  if (!validatePassword(target)){
    statusInvalidHandler("Password too short",target);
  } else if (isEmpty(target)) {
    statusInvalidHandler("This field must not be empty",target);
  } else if (
    !isPasswordSame(target,confirmPasswordInput) 
    && (!isEmpty(confirmPasswordInput)) 
  ) {
    statusInvalidHandler("Passwords do not match",target);
  } else {
    statusValidHandler("Valid",target);
  }
}

passwordInput.addEventListener("input",passwordInputHandler);

const confirmPasswordInput = document.querySelector("#confirm-password");

function confirmPasswordInputHandler(event){
  const target = event.target;

  if (!isPasswordSame(target,passwordInput)) {
    statusInvalidHandler("Password do not match",target);
  } else {
    statusValidHandler("Valid",target);
  }
}

confirmPasswordInput.addEventListener("input",confirmPasswordInputHandler);

const countryInput = document.querySelector("#country");

function countryInputHandler(event){
  const target = event.target;

  if (isEmpty(target)){
    statusInvalidHandler("This field must not be empty",target);
  } else {
    statusValidHandler("Valid",target);
  }
}

countryInput.addEventListener("input",countryInputHandler);

const zipCodeInput = document.querySelector("#zip-code");

function zipCodeInputHandler(event){
  const target = event.target;

  if (isEmpty(target)){
    statusInvalidHandler("This field must not be empty",target);
  } else if (!validateZipCode(target)) {
    statusInvalidHandler("Invalid zip code",target);
  } else {
    statusValidHandler("Valid",target);
  }
}

zipCodeInput.addEventListener("input",zipCodeInputHandler);

const form = document.querySelector("form");

function formSubmitHandler(event){
  // TODO: implement form submit Handler
}

form.addEventListener("submit",formSubmitHandler);