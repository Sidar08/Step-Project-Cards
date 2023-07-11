import { passObj } from "./utils.js";

const loginButton = document.querySelector("#loginButton");
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

function validateForm() {
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  if (loginValue.trim() === "" || passwordValue.trim() === "") {
    alert("Пожалуйста, заполните все поля формы.");
    return false;
  }

  let isAuthenticated = false;

  passObj.forEach(function checkCredentials(e) {
    if (e.login === loginValue && e.password === passwordValue) {
      isAuthenticated = true;
      return;
    }
  });

  if (isAuthenticated) {
    getVisits();
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

import { initialize } from "./Create_visit.js";
import {
  visitsList,
  getVisits,
  removeCard,
  renderCards,
  showFullInfo,
  saveEditedVisit,
  editVisit,
} from "./Card_visit.js";

// import "./filter.js";

document.getElementById("filterButton").addEventListener("click", applyFilters);

function applyFilters() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const statusValue = document.getElementById("statusSelect").value;
  const priorityValue = document.getElementById("prioritySelect").value;

  const filteredVisits = visitsList.filter((visit) => {
    const isTitleMatch = visit.fullname.toLowerCase().includes(searchValue);
    const isDescriptionMatch = visit.description
      .toLowerCase()
      .includes(searchValue);

    const isStatusMatch = statusValue === "" || visit.status === statusValue;
    const isPriorityMatch =
      priorityValue === "" || visit.priority === priorityValue;

    return (
      isTitleMatch || (isDescriptionMatch && isStatusMatch && isPriorityMatch)
    );
  });

  document.querySelector("#visitList").innerHTML = "";

  filteredVisits.forEach((visit) => {
    const card = document.createElement("article");
    card.innerHTML = renderCards(visit);
    document.querySelector("#visitList").appendChild(card);
  });
}
