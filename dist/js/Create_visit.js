import { renderCards, visitsList } from "./Card_visit.js";

export function initialize() {
  class Modal {
    constructor(modalId, triggerId) {
      this.modal = document.getElementById(modalId);
      this.trigger = document.getElementById(triggerId);
      this.closeBtn = this.modal.getElementsByClassName("close")[0];

      this.trigger.addEventListener("click", () => {
        this.open();
      });

      this.closeBtn.addEventListener("click", () => {
        this.close();
        this.clearForm();
      });

      window.addEventListener("click", (event) => {
        if (event.target === this.modal) {
          this.close();
          this.clearForm();
        }
      });
    }

    open() {
      this.modal.style.display = "block";
    }

    close() {
      this.modal.style.display = "none";
    }

    clearForm() {
      const formFields = this.modal.querySelectorAll("input, textarea");
      formFields.forEach((field) => {
        field.value = "";
      });
    }
  }

  class Visit {
    constructor(doctor, purpose, description, urgency, fullName) {
      this.doctor = doctor;
      this.purpose = purpose;
      this.description = description;
      this.urgency = urgency;
      this.fullName = fullName;
      this.comments = "";
    }

    getFormData() {
      const formData = {
        doctor: this.doctor,
        purpose: this.purpose,
        description: this.description,
        urgency: this.urgency,
        fullname: this.fullName,
        comments: this.comments,
      };
      return formData;
    }
    ////---------------создание карточки--------------------------------------------
    createCard() {
      const token = "1cbb9698-a4fe-443a-9077-a3f3556797a5";
      const url = "https://ajax.test-danit.com/api/v2/cards";
      const formData = this.getFormData();

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            // this.displayCard(data);
            visitsList.push(data);
            renderCards();
            modal.close();
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }  

  ///---------для стоматолога--------------
  class VisitDentist extends Visit {
    constructor(purpose, description, urgency, fullName, lastVisitDate) {
      super("Стоматолог", purpose, description, urgency, fullName);
      this.lastVisitDate = lastVisitDate;
    }

    getFormData() {
      const formData = super.getFormData();
      return { ...formData, lastVisitDate: this.lastVisitDate };
    }
  }

  //---------для кардиолога-----------
  class VisitCardiologist extends Visit {
    constructor(
      purpose,
      description,
      urgency,
      fullName,
      bloodPressure,
      bmi,
      heartDiseases,
      age
    ) {
      super("Кардіолог", purpose, description, urgency, fullName);
      this.bloodPressure = bloodPressure;
      this.bmi = bmi;
      this.heartDiseases = heartDiseases;
      this.age = age;
    }

    getFormData() {
      const formData = super.getFormData();
      return {
        ...formData,
        bloodPressure: this.bloodPressure,
        bmi: this.bmi,
        heartDiseases: this.heartDiseases,
        age: this.age,
      };
    }
  }

  // --------для терапевта-------
  class VisitTherapist extends Visit {
    constructor(purpose, description, urgency, fullName, age) {
      super("Терапевт", purpose, description, urgency, fullName);
      this.age = age;
    }

    getFormData() {
      const formData = super.getFormData();
      return { ...formData, age: this.age };
    }
  }

  const modal = new Modal("modal", "createVisitBtn");

  //----поля для доктора------
  const doctorSelect = document.getElementById("doctor");
  const additionalFieldsContainer = document.getElementById("additionalFields");

  doctorSelect.addEventListener("change", (event) => {
    const selectedDoctor = event.target.value;
    additionalFieldsContainer.innerHTML = "";

    if (selectedDoctor === "cardiologist") {
      additionalFieldsContainer.innerHTML = `
      <div class="form-field">
        <input placeholder="Звичайний тиск"  type="text" id="bloodPressure" autocomplete="off">
      </div>
      <div class="form-field">
        <input placeholder="Індекс маси тіла"  type="text" id="bmi" autocomplete="off">
      </div>
      <div class="form-field">
        <input placeholder="Захворювання серцево-судинної системи" type="text" id="heartDiseases" autocomplete="off">
      </div>
      <div class="form-field">
        <input placeholder="Вік" type="number" id="age" autocomplete="off">
      </div>
    `;
    } else if (selectedDoctor === "dentist") {
      additionalFieldsContainer.innerHTML = `
      <div class="form-field">
        <label for="lastVisitDate">Дата останнього відвідування:</label>
        <input type="date" id="lastVisitDate" autocomplete="off">
      </div>
    `;
    } else if (selectedDoctor === "therapist") {
      additionalFieldsContainer.innerHTML = `
      <div class="form-field">
        <input placeholder="Вік" type="number" id="age" autocomplete="off">
      </div>
    `;
    }

    additionalFieldsContainer.style.display = selectedDoctor ? "block" : "none";
  });

  let visit;

  //------обязательные поля----
  const createBtn = document.getElementById("createBtn");
  createBtn.addEventListener("click", () => {
    const purpose = document.getElementById("purpose").value;
    const description = document.getElementById("description").value;
    const urgency = document.getElementById("urgency").value;
    const fullName = document.getElementById("fullName").value;
    const selectedDoctor = doctorSelect.value;
  
    if (!selectedDoctor || !purpose || !description || !urgency || !fullName) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }
  
    if (selectedDoctor === "cardiologist") {
      const bloodPressure = document.getElementById("bloodPressure").value;
      const bmi = document.getElementById("bmi").value;
      const heartDiseases = document.getElementById("heartDiseases").value;
      const age = document.getElementById("age").value;
  
      if (!bloodPressure || !bmi || !heartDiseases || !age) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }
  
      visit = new VisitCardiologist(
        purpose,
        description,
        urgency,
        fullName,
        bloodPressure,
        bmi,
        heartDiseases,
        age
      );
    } else if (selectedDoctor === "dentist") {
      const lastVisitDate = document.getElementById("lastVisitDate").value;
  
      if (!lastVisitDate) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }
  
      visit = new VisitDentist(
        purpose,
        description,
        urgency,
        fullName,
        lastVisitDate
      );
    } else if (selectedDoctor === "therapist") {
      const age = document.getElementById("age").value;
  
      if (!age) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }
  
      visit = new VisitTherapist(purpose, description, urgency, fullName, age);
    }
  
    if (visit) {
      visit.createCard();
      modal.close();
      modal.clearForm();
    }
  });
  
}

document.addEventListener("DOMContentLoaded", initialize);
