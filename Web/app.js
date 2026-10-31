const filterButtons = [...document.querySelectorAll(".filter-chip")];
const foodCards = [...document.querySelectorAll(".food-card")];
const searchInput = document.querySelector("#food-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

function updateFoods() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  for (const card of foodCards) {
    const categories = card.dataset.category.split(" ");
    const matchesCategory = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = card.dataset.name.includes(query);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    visibleCount += Number(isVisible);
  }

  emptyState.hidden = visibleCount !== 0;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    for (const filterButton of filterButtons) {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    }

    updateFoods();
  });
}

searchInput.addEventListener("input", updateFoods);

for (const button of document.querySelectorAll(".save-button")) {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.setAttribute(
      "aria-label",
      `${isSaved ? "Save" : "Unsave"} ${button.closest(".food-card").querySelector("h3").textContent}`,
    );
    button.querySelector("span").textContent = isSaved ? "♡" : "♥";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    searchInput.blur();
    updateFoods();
  }
});
