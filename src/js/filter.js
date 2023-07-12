import {
    visitsList,
    getVisits,
    removeCard,
    renderCards,
    showFullInfo,
    saveEditedVisit,
    editVisit,
  } from "./Card_visit.js";

export function applyFilters() {
    const searchInput = document.getElementById("searchInput");
    const statusSelect = document.getElementById("statusSelect");
    const prioritySelect = document.getElementById("prioritySelect");
  
    let filteredList = visitsList;
  
    // Фильтрация по полю поиска
    if (searchInput.value.trim() !== "") {
      const searchTerm = searchInput.value.trim().toLowerCase();
      filteredList = filteredList.filter((visit) => {
        return (
          visit.fullname.toLowerCase().includes(searchTerm) ||
          visit.purpose.toLowerCase().includes(searchTerm) ||
          visit.description.toLowerCase().includes(searchTerm)
        );
      });
    }
  
    // Фильтрация по статусу
    if (statusSelect.value !== "") {
      filteredList = filteredList.filter((visit) => {
        return visit.urgency === statusSelect.value;
      });
    }
  
    // Фильтрация по приоритету
    // if (prioritySelect.value !== "") {
    //   filteredList = filteredList.filter((visit) => {
    //     return visit.urgency.includes(prioritySelect.value);
    //   });
    // }
    if (prioritySelect.value !== "") {
      filteredList = filteredList.filter((visit) => {
        return visit.urgency.includes(prioritySelect.value);
      });
    }
  
    // Обновление отфильтрованного списка
    const visitList = document.querySelector("#visitList");
    visitList.innerHTML = ""; // Очистка списка
  
    if (filteredList.length === 0) {
      const noItemsText = document.createElement("p");
      noItemsText.className = "text-board";
      noItemsText.textContent = "Нет элементов для отображения";
      visitList.appendChild(noItemsText);
    } else {
      filteredList.forEach((element) => {
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
        card.innerHTML += `<button id="displayButton${element.id}" data-card="${element.id}">Показати деталі</button>
          <button id="editButton${element.id}" data-card="${element.id}">Редагувати</button>
          `;
        visitList.appendChild(card);
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
  }