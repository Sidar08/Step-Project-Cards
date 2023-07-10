export function filterVisits() {
  const filterTitle = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filterStatus = document.getElementById("statusSelect").value;
  const filterPriority = document.getElementById("prioritySelect").value;

  const visitList = document.getElementById("visitList");
  const visitItems = visitList.getElementsByClassName("visit-item");

  Array.from(visitItems).forEach((visitItem) => {
    const visitTitle = visitItem
      .querySelector(".visit-title")
      .textContent.toLowerCase();
    const visitStatus = visitItem.querySelector(".visit-status").textContent;
    const visitPriority =
      visitItem.querySelector(".visit-priority").textContent;

    const isTitleMatch = visitTitle.includes(filterTitle);
    const isStatusMatch = filterStatus === "" || visitStatus === filterStatus;
    const isPriorityMatch =
      filterPriority === "" || visitPriority === filterPriority;

    if (isTitleMatch && isStatusMatch && isPriorityMatch) {
      visitItem.style.display = "block";
    } else {
      visitItem.style.display = "none";
    }
  });
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterVisits);

const statusSelect = document.getElementById("statusSelect");
statusSelect.addEventListener("change", filterVisits);

const prioritySelect = document.getElementById("prioritySelect");
prioritySelect.addEventListener("change", filterVisits);

const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", filterVisits);
