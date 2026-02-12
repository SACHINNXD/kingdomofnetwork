const SERVICE_ID = "service_g9l7c9i";
const TEMPLATE_ID = "template_9w6gkcd";

let currentOTP = null;
let pendingUser = null;
let loginUserEmail = null;
let resendTimer = null;
let resendTimeLeft = 120;

/* ================= USERS STORAGE ================= */

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setLoggedIn(email) {
  localStorage.setItem("loggedInUser", email);
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

/* ================= OTP ================= */

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP(email) {
  currentOTP = generateOTP();

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email: email,
    otp: currentOTP
  });
}

/* ================= RESEND TIMER ================= */

function startResendTimer(email) {
  const btn = document.getElementById("resendBtn");
  resendTimeLeft = 120;
  btn.disabled = true;

  updateTimerUI(btn);

  resendTimer = setInterval(() => {
    resendTimeLeft--;
    updateTimerUI(btn);

    if (resendTimeLeft <= 0) {
      clearInterval(resendTimer);
      btn.textContent = "Resend OTP";
      btn.disabled = false;

      btn.onclick = async () => {
        await sendOTP(email);
        startResendTimer(email);
      };
    }
  }, 1000);
}

function updateTimerUI(btn) {
  let minutes = String(Math.floor(resendTimeLeft / 60)).padStart(2, "0");
  let seconds = String(resendTimeLeft % 60).padStart(2, "0");
  btn.textContent = `Resend OTP (${minutes}:${seconds})`;
}

/* ================= REGISTER ================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
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

    await sendOTP(email);

    pendingUser = { email, password: pass };
    openModal(email);
  });
}

/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const pass = loginPass.value;

    const users = getUsers();
    const valid = users.find(u => u.email === email && u.password === pass);

    if (!valid) {
      shakeField(loginEmail);
      shakeField(loginPass);
      return;
    }

    await sendOTP(email);
    loginUserEmail = email;
    openModal(email);
  });
}

/* ================= OTP INPUT LOGIC ================= */

function setupOTPInputs() {
  const inputs = document.querySelectorAll(".otp-boxes input");

  inputs.forEach((input, index) => {
    input.value = "";
    input.classList.remove("error");

    input.addEventListener("input", () => {
      if (!/^[0-9]$/.test(input.value)) {
        input.value = "";
        return;
      }

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

      checkOTP();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  inputs[0].focus();
}

function checkOTP() {
  const inputs = document.querySelectorAll(".otp-boxes input");
  let entered = "";

  inputs.forEach(i => entered += i.value);

  if (entered.length === 6) {

    if (entered === currentOTP) {

      if (pendingUser) {
        let users = getUsers();
        users.push(pendingUser);
        saveUsers(users);
        setLoggedIn(pendingUser.email);
        pendingUser = null;
      }

      if (loginUserEmail) {
        setLoggedIn(loginUserEmail);
        loginUserEmail = null;
      }

      window.location.href = "index.html";

    } else {
      inputs.forEach(i => {
        i.classList.add("error");
        shakeField(i);
      });
    }
  }
}

/* ================= UI HELPERS ================= */

function shakeField(field) {
  field.classList.add("shake");
  setTimeout(() => field.classList.remove("shake"), 300);
}

function openModal(email) {
  document.getElementById("otpModal").style.display = "flex";
  setupOTPInputs();
  startResendTimer(email);
}

function closeModal() {
  document.getElementById("otpModal").style.display = "none";
}
