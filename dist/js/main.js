import {passObj} from "./utils";


const loginButton = document.querySelector('#loginButton');

function showLoginForm() {
      const formBox = document.querySelector(".form-box");
      formBox.style.display = "block";
    }

loginButton.addEventListener("click", showLoginForm);

function hideLoginForm() {
  const formBox = document.querySelector(".form-box");
  formBox.style.display = "none";
}

const formBoxCloseBtn = document.querySelector(`.form-box__close__btn`);

formBoxCloseBtn.addEventListener("click", hideLoginForm);

function validateForm() {
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  passObj.forEach((e) => {
    if (e.login === login.value && e.password === password.value) {
      localStorage.setItem("login", login.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("autoLogIn", true);
      this.getFormCloseAction();
      this.dataValue = true;

      return this.dataValue;
    }
    });

  if (loginValue.trim() === "" || passwordValue.trim() === "") {
    alert("Пожалуйста, заполните все поля формы.");
    return false;
  }

  return true;
}

const visitButton = document.querySelector(`.visitButton`);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); 

  if (validateForm()) {
  
    hideLoginForm();
    loginButton.style.display = "none";
    visitButton.style.display = "block";
  }
});