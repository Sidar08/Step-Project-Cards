import { passObj } from "./utils.js"

const loginButton = document.querySelector('#loginButton');
const incorrect = document.querySelector(".incorrect");

function showLoginForm() {
      const formBox = document.querySelector(".form-box");
      formBox.style.display = "block";
    }

loginButton.addEventListener("click", showLoginForm);

function hideLoginForm() {
  const formBox = document.querySelector(".form-box");
  formBox.style.display = "none";
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");

  loginInput.value = ""; 
  passwordInput.value = ""; 
  incorrect.style.display = "none";
}

const formBoxCloseBtn = document.querySelector(`.form-box__close__btn`);

formBoxCloseBtn.addEventListener("click", hideLoginForm);



// formBoxCloseBtn.addEventListener("click", function () {
//   const loginInput = document.getElementById("login");
//   const passwordInput = document.getElementById("password");

//   loginInput.value = ""; // Очистка поля введення для логіна
//   passwordInput.value = ""; // Очистка поля введення для пароля

//   hideLoginForm();
// });

function validateForm() {
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  let isAuthenticated = false;
  

  passObj.forEach(function checkCredentials(e) {
    if (e.login === loginValue && e.password === passwordValue) {
      isAuthenticated = true;
      return;
    }
  });

  if (isAuthenticated) {
    localStorage.setItem("login", loginValue);
    localStorage.setItem("password", passwordValue);
    localStorage.setItem("autoLogIn", true);
    return true;
  } else {
    const errElem = document.querySelector(".modal");
    errElem.style.position = "fixed";
    
    incorrect.style.display = "block";
    return false;
  }


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