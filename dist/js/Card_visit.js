export async function getVisits() {
  visitsList = await (
    await fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 1cbb9698-a4fe-443a-9077-a3f3556797a5`, //Після створення робочого коду для входу, впиши токен
      },
    })
  ).json();
  renderCards(visitsList);
}

export let visitsList = [];

export function removeCard(event) {
  fetch(
    `https://ajax.test-danit.com/api/v2/cards/${event.target.dataset.card}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer 1cbb9698-a4fe-443a-9077-a3f3556797a5`, //Після створення робочого коду для входу, впиши токен
      },
    }
  ).then(() => {
    document.querySelector(`#card${event.target.dataset.card}`).remove();
    const idToRemove = Number(event.target.dataset.card);
    visitsList = visitsList.filter((visit) => {
      return visit.id !== idToRemove;
    });

    //-------текс на доске появляется---------
    if (visitsList.length === 0) {
      renderCards(visitsList); 
    }
  });
}

export function renderCards(visitsList) {

  //-------текс на доске---------
  const visitList = document.querySelector("#visitList");
  visitList.innerHTML = ""; 

  if (visitsList.length === 0) {
    const noItemsText = document.createElement("p");
    noItemsText.className = "text-board";
    noItemsText.textContent = "No items have been added";
    visitList.appendChild(noItemsText);
    return;
  }
  //-------текс на доске---------

  document.querySelector("#visitList").innerText = "";
  visitsList.forEach((element) => {
    const card = document.createElement("article");
    card.innerHTML = `
        <h2 class="visit-heading">${element.fullname}</h2>
        <img src="./dist/images/close-icon.png" class="delete-icon" id="deleteIcon${element.id}" data-card="${element.id}" alt="">
        <p>Лікар: ${element.doctor}</p>
        <p class="visit-hidden">Причина: ${element.purpose}</p>
        <p class="visit-hidden">Терміновість: ${element.urgency}</p>
        <p class="visit-hidden">Опис візиту: ${element.description}</p>`;
    if (element.doctor == "Терапевт") {
      card.innerHTML += `
        <p class="visit-hidden">Вік: ${element.age}</p>
        `;
    } else if (element.doctor == "Стоматолог") {
      card.innerHTML += `
        <p class="visit-hidden">Дата останнього візиту: ${element.lastVisitDate}</p>
        `;
    } else {
      card.innerHTML += `
        <p class="visit-hidden">Кров'яний тиск: ${element.bloodPressure}</p>
        <p class="visit-hidden">Індекс маси тіла: ${element.bmi}</p>
        <p class="visit-hidden">Серцево-судинні захворювання: ${element.heartDiseases}</p>
        <p class="visit-hidden">Вік: ${element.age}</p>
        `;
    }
    card.innerHTML += `<button id="displayButton${element.id}" data-card="${element.id}">Show More</button>
      <button id="editButton${element.id}" data-card="${element.id}">Редагувати</button>
      `;
    document.querySelector("#visitList").append(card);
    document
      .querySelector(`#displayButton${element.id}`)
      .addEventListener("click", showFullInfo);
    document
      .querySelector(`#deleteIcon${element.id}`)
      .addEventListener("click", removeCard);
    card.setAttribute("id", `card${element.id}`);
    document
      .querySelector(`#editButton${element.id}`)
      .addEventListener("click", editVisit);
    card.classList.add("visit-card");
  });
}

export function showFullInfo(event) {
  const hiddenElements = document
    .querySelector(`#card${event.target.dataset.card}`)
    .querySelectorAll(".visit-hidden");
  hiddenElements.forEach((element) => {
    element.classList.toggle("visit-hidden");
    event.target.classList.add("visit-hidden");
  });
}

export function editVisit(event) {
  const cardId = event.target.dataset.card;
  const card = document.querySelector(`#card${cardId}`);
  const visit = visitsList.find((visit) => {
    return visit.id == cardId;
  });
  card.innerHTML = `
      <form>
      <label for="doctor${cardId}">Лікар:</label><br>
      <select id="doctor${cardId}" name="Лікар">
        <option value="Терапевт">Терапевт</option>
        <option value="Стоматолог">Стоматолог</option>
        <option value="Кардиолог">Кардіолог</option>
      </select><br>
      <label for="name${cardId}">Ім'я:</label><br>
      <input id="name${cardId}" value="${visit.fullname}"></input><br>
      <label for="purpose${cardId}">Мета:</label><br>
      <input id="purpose${cardId}" value="${visit.purpose}"></input><br>
      <label for="description${cardId}">Опис візиту:</label><br>
      <textarea id="description${cardId}">${visit.description}</textarea><br>
  <label for="urgency${cardId}">Терміновість:</label><br>
  <select id="urgency${cardId}" name="Терміновість">
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select><br>
      <div class ="extra-fields" id="extraFields${cardId}"></div>
      <button type="button" id="saveButton${cardId}" data-card="${cardId}">Зберегти</button>
      <button type="button" id="cancelButton${cardId}">Відмінити</button>
      </form>
    `;
  document.getElementById(`doctor${cardId}`).value = visit.doctor;
  document.getElementById(`urgency${cardId}`).value = visit.urgency;
  const doctor = document.querySelector(`#doctor${cardId}`);
  const extraFields = document.querySelector(`#extraFields${cardId}`);
  function showExtraFields() {
    const selectedDoctor = doctor.value;
    extraFields.innerHTML = "";
    if (selectedDoctor == "Терапевт") {
      let age = visit.age;
      if (age == undefined) {
        age = "";
      }
      extraFields.innerHTML = `
        <label for="age${cardId}">Вік:</label><br>
        <input id="age${cardId}" type="number" value="${age}"></input>
        `;
    } else if (selectedDoctor == "Стоматолог") {
      let lastVisitDate = visit.lastVisitDate;
      if (lastVisitDate == undefined) {
        lastVisitDate = "";
      }
      extraFields.innerHTML = `
        <label for="lastVisitDate${cardId}">Дата останнього візиту:</label><br>
        <input id="lastVisitDate${cardId}" type="date" value="${lastVisitDate}"></input>
        `;
    } else {
      let bloodPressure = visit.bloodPressure;
      if (bloodPressure == undefined) {
        bloodPressure = "";
      }
      let bmi = visit.bmi;
      if (bmi == undefined) {
        bmi = "";
      }
      let heartDiseases = visit.heartDiseases;
      if (heartDiseases == undefined) {
        heartDiseases = "";
      }
      let age = visit.age;
      if (age == undefined) {
        age = "";
      }
      extraFields.innerHTML = `
        <label for="bloodPressure${cardId}">Звичайний тиск:</label><br>
        <input id="bloodPressure${cardId}" value="${bloodPressure}"></input><br>
        <label for="bmi${cardId}">Індекс маси тіла:</label><br>
        <input id="bmi${cardId}" value="${bmi}"></input><br>
        <label for="heartDiseases${cardId}">Перенесені захворювання серцево-судинної системи: </label><br>
        <input id="heartDiseases${cardId}" value="${heartDiseases}"></input><br>
        <label for="age${cardId}">Вік:</label><br>
        <input id="age${cardId}" type="number" value="${age}"></input> <br>
        `;
    }
  }
  showExtraFields();
  doctor.addEventListener("change", showExtraFields);
  document
    .querySelector(`#cancelButton${cardId}`)
    .addEventListener("click", renderCardsOnClick);
  document
    .querySelector(`#saveButton${cardId}`)
    .addEventListener("click", saveEditedVisit);
}
function renderCardsOnClick () {
  return renderCards(visitsList);
}
export function saveEditedVisit(event) {
  const cardId = event.target.dataset.card;
  const visit = visitsList.find((visit) => {
    return visit.id == cardId;
  });
  visit.fullname = document.querySelector(`#name${cardId}`).value;
  visit.doctor = document.querySelector(`#doctor${cardId}`).value;
  visit.purpose = document.querySelector(`#purpose${cardId}`).value;
  visit.description = document.querySelector(`#description${cardId}`).value;
  visit.urgency = document.querySelector(`#urgency${cardId}`).value;
  if (visit.doctor == "Терапевт") {
    visit.age = document.querySelector(`#age${cardId}`).value;
  } else if (visit.doctor == "Стоматолог") {
    visit.lastVisitDate = document.querySelector(
      `#lastVisitDate${cardId}`
    ).value;
  } else {
    visit.bloodPressure = document.querySelector(
      `#bloodPressure${cardId}`
    ).value;
    visit.bmi = document.querySelector(`#bmi${cardId}`).value;
    visit.heartDiseases = document.querySelector(
      `#heartDiseases${cardId}`
    ).value;
    visit.age = document.querySelector(`#age${cardId}`).value;
  }
  fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 1cbb9698-a4fe-443a-9077-a3f3556797a5`,
    },
    body: JSON.stringify(visit),
  }).then(() => renderCards(visitsList));
}
