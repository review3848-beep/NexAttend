// student/login.js
import { callApi } from "../js/api.js";

/* ================= DOM ================= */
const idInput  = document.getElementById("studentId");
const pwInput  = document.getElementById("password");
const btn      = document.getElementById("loginBtn");
const msgEl    = document.getElementById("msg");

/* ================= UX ================= */
idInput.focus();

/* ================= EVENTS ================= */
btn.addEventListener("click", login);
pwInput.addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

/* ================= MAIN ================= */
async function login() {
  const studentId = idInput.value.trim();
  const password  = pwInput.value.trim();

  msgEl.textContent = "";

  // ---------- validation ----------
  if (!studentId || !password) {
    msgEl.textContent = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  // ---------- loading ----------
  btn.disabled = true;
  btn.textContent = "กำลังเข้าสู่ระบบ...";

  try {
    const res = await callApi("studentLogin", {
      studentId,
      password
    });

    // ---------- error from GAS ----------
    if (!res || res.success !== true) {
      msgEl.textContent = res?.message || "ข้อมูลไม่ถูกต้อง";
      btn.disabled = false;
      btn.textContent = "เข้าสู่ระบบ";
      return;
    }

    // ---------- SUCCESS ----------
    // เก็บ session นักเรียน
    localStorage.setItem(
      "student",
      JSON.stringify({
        studentId: res.data.studentId,
        name: res.data.name,
        classRoom: res.data.classRoom
      })
    );

    // redirect
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    msgEl.textContent = "ไม่สามารถเชื่อมต่อระบบได้";
    btn.disabled = false;
    btn.textContent = "เข้าสู่ระบบ";
  }
}
