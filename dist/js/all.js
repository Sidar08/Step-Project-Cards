// function fetchVisits() {
//   return fetch("https://ajax.test-danit.com/api/cards.json")
//     .then((response) => response.json())
//     .then((data) => {
//       if (Array.isArray(data)) {
//         return data.map((card) => card.visit);
//       } else {
//         throw new Error("Неправильний формат даних");
//       }
//     })
//     .catch((error) => {
//       throw new Error("Помилка отримання списку візитів");
//     });
// }

// export { fetchVisits };

// import { passObj } from "./utils.js"

// const passObj = [
//   { login: "admin@gmail.com", password: "qwerty123" },
//   { login: "admin", password: "qwerty123" },
// ];

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
    const incorrect = document.querySelector(".incorrect");
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



export const passObj = [
  { login: "admin@gmail.com", password: "qwerty123" },
  { login: "admin", password: "qwerty123" },
];
  

