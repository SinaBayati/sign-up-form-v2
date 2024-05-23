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

function validateEmail(emailEl){
  if (emailEl.validity.typeMismatch) {
    return false;
  }
  return true;
}

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const countryInput = document.querySelector("#country");
const zipCodeInput = document.querySelector("#zip-code");
const submitBtn = document.querySelector("button[type='submit']");
