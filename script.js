const profileBtn = document.getElementById("profileBtn");
const modal = document.getElementById("accountModal");

function renderModal() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h3>Account</h3>
        <button onclick="window.location.href='register.html'">Register</button>
        <button onclick="window.location.href='login.html'">Login</button>
      </div>
    `;
  } else {
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h3>Profile</h3>
        <p style="margin:20px 0;"><strong>Email:</strong><br>${loggedInUser}</p>
        <button onclick="logoutUser()">Logout</button>
      </div>
    `;
  }

  modal.style.display = "flex";

  document.querySelector(".close-btn").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

profileBtn.addEventListener("click", renderModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}
