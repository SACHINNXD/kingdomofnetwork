function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* REGISTER */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = regEmail.value.trim().toLowerCase();
    const pass = regPass.value;
    const confirm = regConfirm.value;

    if (pass !== confirm) {
      shakeField(regPass);
      shakeField(regConfirm);
      return;
    }

    let users = getUsers();
    if (users.some(u => u.email === email)) {
      shakeField(regEmail);
      return;
    }

    users.push({ email, password: pass });
    saveUsers(users);

    openModal();
  });
}

/* LOGIN */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const pass = loginPass.value;

    const users = getUsers();
    const valid = users.find(u => u.email === email && u.password === pass);

    if (valid) {
      openModal();
    } else {
      shakeField(loginEmail);
      shakeField(loginPass);
    }
  });
}

function shakeField(field) {
  field.classList.add("shake");
  setTimeout(() => field.classList.remove("shake"), 300);
}

function openModal() {
  document.getElementById("otpModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("otpModal").style.display = "none";
}
