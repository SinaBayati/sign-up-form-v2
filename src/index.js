import "./styles.css";

let isFormValid = false;
let inputsStatusObject = {
  email: "invalid",
  password: "invalid",
  confirmPassword: "invalid",
  country: "invalid",
  zipCode: "invalid",
};

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
    inputsStatusObject.email = "valid";
    statusValidHandler(message,target);
  } else {
    inputsStatusObject.email = "invalid";
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
  
  isFormValid = validateForm();
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

function validateForm(){
  return Object.values(inputsStatusObject).every(value => value === "valid");
}

const passwordInput = document.querySelector("#password");

function passwordInputHandler(event){
  const target = event.target;

  if (!validatePassword(target)){
    inputsStatusObject.password = "invalid";
    statusInvalidHandler("Password too short",target);
  } else if (isEmpty(target)) {
    inputsStatusObject.password = "invalid";
    statusInvalidHandler("This field must not be empty",target);
  } else if (
    !isPasswordSame(target,confirmPasswordInput) 
    && (!isEmpty(confirmPasswordInput)) 
  ) {
    inputsStatusObject.password = "invalid";
    statusInvalidHandler("Passwords do not match",target);
  } else {
    inputsStatusObject.password = "valid";
    statusValidHandler("Valid",target);
  }
}

passwordInput.addEventListener("input",passwordInputHandler);

const confirmPasswordInput = document.querySelector("#confirm-password");

function confirmPasswordInputHandler(event){
  const target = event.target;

  if (!isPasswordSame(target,passwordInput)) {
    inputsStatusObject.confirmPassword = "invalid";
    statusInvalidHandler("Password do not match",target);
  } else {
    inputsStatusObject.confirmPassword = "valid";
    statusValidHandler("Valid",target);
  }
}

confirmPasswordInput.addEventListener("input",confirmPasswordInputHandler);

const countryInput = document.querySelector("#country");

function countryInputHandler(event){
  const target = event.target;

  if (isEmpty(target)){
    inputsStatusObject.country = "invalid";
    statusInvalidHandler("This field must not be empty",target);
  } else {
    inputsStatusObject.country = "valid";
    statusValidHandler("Valid",target);
  }
}

countryInput.addEventListener("input",countryInputHandler);

const zipCodeInput = document.querySelector("#zip-code");

function zipCodeInputHandler(event){
  const target = event.target;

  if (isEmpty(target)){
    inputsStatusObject.zipCode = "invalid";
    statusInvalidHandler("This field must not be empty",target);
  } else if (!validateZipCode(target)) {
    inputsStatusObject.zipCode = "invalid";
    statusInvalidHandler("Invalid zip code",target);
  } else {
    inputsStatusObject.zipCode = "valid";
    statusValidHandler("Valid",target);
  }
}

zipCodeInput.addEventListener("input",zipCodeInputHandler);

const formEl = document.querySelector("form");

function formSubmitHandler(event){
  if (!isFormValid) {
    event.preventDefault();
  }
}

formEl.addEventListener("submit",formSubmitHandler);