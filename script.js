const profileBtn = document.getElementById("profileBtn");
const modal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");

profileBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
