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

//viktor codе
async function getVisits() {
  visitsList = await (
    await fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 1cbb9698-a4fe-443a-9077-a3f3556797a5`, //Після створення робочого коду для входу, впиши токен
      },
    })
  ).json();
  renderCards();
  console.log(visitsList);
}
let visitsList;
function removeCard (event){
  fetch(`https://ajax.test-danit.com/api/v2/cards/${event.target.dataset.card}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer 1cbb9698-a4fe-443a-9077-a3f3556797a5` //Після створення робочого коду для входу, впиши токен
  },
})
.then(()=>{
  document.querySelector(`#card${event.target.dataset.card}`).remove();
  const idToRemove = Number(event.target.dataset.card);
  visitsList = visitsList.filter((visit) => {
    return visit.id !== idToRemove;
  });
})
}

function renderCards() {
  document.querySelector("#visitList").innerText = "";
  visitsList.forEach((element) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <h2 class="visit-heading">${element.fullname}</h2>
      <img src="./dist/images/close-icon.png" class="delete-icon" id="deleteIcon${element.id}" data-card="${element.id}" alt="">
      <p>Лікар: ${element.doctor}</p>
      <p class="visit-hidden">Причина: ${element.purpose}</p>
      <p class="visit-hidden">Терміновість: ${element.urgency}</p>`
    if ((element.doctor == "Терапевт")) {
      card.innerHTML += `
      <p class="visit-hidden">Вік: ${element.age}</p>
      `;
    } else if ((element.doctor == "Стоматолог")) {
      card.innerHTML += `
      <p class="visit-hidden">Дата останнього візиту: ${element.lastVisitDate}</p>
      `;
    } else {
      card.innerHTML += `
      <p class="visit-hidden">Кров'яний тиск: ${element.bloodPreasure}</p>
      <p class="visit-hidden">Індекс маси тіла: ${element.bwi}</p>
      <p class="visit-hidden">Серцево-судинні захворювання: ${element.heartDiseases}</p>
      <p class="visit-hidden">Вік: ${element.age}</p>
      `;
    }
    card.innerHTML += `<button id="displayButton${element.id}" data-card="${element.id}">Show More</button>`
    document.querySelector("#visitList").append(card);
    document
      .querySelector(`#displayButton${element.id}`)
      .addEventListener("click", showFullInfo);
      document
      .querySelector(`#deleteIcon${element.id}`)
      .addEventListener("click", removeCard);
    card.setAttribute("id", `card${element.id}`);
    card.classList.add("visit-card");
  });
}
function showFullInfo (event) {
  const hiddenElements = document.querySelector(`#card${event.target.dataset.card}`).querySelectorAll(".visit-hidden");
  hiddenElements.forEach((element) => {
    element.classList.toggle("visit-hidden");
    event.target.classList.add("visit-hidden");
  })
}
getVisits();