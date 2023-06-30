


const navigationIcon = document.querySelector(".navigation__icon");
const navigationList = document.querySelector(".navigation__list");
const navigationItem = document.querySelector(".navigation-item");

if(window.matchMedia("min-width: 481px")== true) {
  navigationItem.classList.remove("active")
}

const handleMenuClick = () => {
  if (navigationIcon.innerText === "menu") {
    navigationIcon.innerText = "close";
    navigationList.classList.remove("invisible");
  } else {
    navigationIcon.innerText = "menu";
    navigationList.classList.add("invisible");
  }
};

navigationIcon.addEventListener("click", handleMenuClick);

document.addEventListener("click", (event) => {
  const target = event.target;

  const isMenuButtonClicked =
    target === navigationIcon || navigationIcon.contains(target);
  const isListItemClicked =
    target.classList.contains("navigation__link") ||
    target.parentNode.classList.contains("navigation__link");

  if (!isMenuButtonClicked && !isListItemClicked && !navigationList.contains(target)) {
    navigationIcon.innerText = "menu";
    navigationList.classList.add("invisible");
  }
});

const navigationItems = document.querySelectorAll(".navigation__item");

navigationItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    navigationItems.forEach((item) => {
      item.classList.remove("active");
    });

    item.classList.add("active");

    event.stopPropagation();
  });
});



