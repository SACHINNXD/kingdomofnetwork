const profileBtn = document.getElementById("profileBtn");
const modal = document.getElementById("accountModal");
const closeAccount = document.getElementById("closeAccount");

profileBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeAccount.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
