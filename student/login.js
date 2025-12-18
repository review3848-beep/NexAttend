import { callApi } from "../js/api.js";

/* ================= DOM ================= */
const idInput  = document.getElementById("studentId");
const pwInput  = document.getElementById("password");
const btn      = document.getElementById("loginBtn");
const msgEl    = document.getElementById("msg");

/* ================= EVENT ================= */
btn.addEventListener("click", login);
pwInput.addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

/* ================= LOGIN ================= */
async function login() {
  const studentId = idInput.value.trim();
  const password  = pwInput.value.trim();

  msgEl.textContent = "";

  if (!studentId || !password) {
    msgEl.textContent = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  btn.disabled = true;
  btn.textContent = "กำลังเข้าสู่ระบบ...";

  try {
    const res = await callApi("studentLogin", {
      studentId,
      password
    });

    if (!res || res.success !== true) {
      msgEl.textContent = res?.message || "รหัสหรือรหัสผ่านไม่ถูกต้อง";
      btn.disabled = false;
      btn.textContent = "เข้าสู่ระบบ";
      return;
    }

    // ✅ เก็บ session
    localStorage.setItem("student", JSON.stringify(res.data));

    // 👉 ไป dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    msgEl.textContent = "ไม่สามารถเชื่อมต่อระบบได้";
    btn.disabled = false;
    btn.textContent = "เข้าสู่ระบบ";
  }
}
