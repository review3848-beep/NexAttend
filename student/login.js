// student/login.js
import { callApi } from "../js/api.js";

/* ================= DOM ================= */
const idInput  = document.getElementById("studentId");
const pwInput  = document.getElementById("password");
const btn      = document.getElementById("loginBtn");
const msg      = document.getElementById("msg");

/* ================= UX ================= */
window.addEventListener("load", () => {
  idInput.focus();
});

/* ================= ACTION ================= */
btn.addEventListener("click", login);
pwInput.addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

async function login() {
  const studentId = idInput.value.trim();
  const password  = pwInput.value.trim();

  msg.textContent = "";

  if (!studentId || !password) {
    msg.textContent = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  btn.disabled = true;
  btn.textContent = "กำลังเข้าสู่ระบบ...";

  try {
    const res = await callApi("studentLogin", {
      studentId,
      password
    });

    btn.disabled = false;
    btn.textContent = "เข้าสู่ระบบ";

    if (!res || res.success !== true) {
      msg.textContent = res?.message || "ข้อมูลไม่ถูกต้อง";
      return;
    }

    // ✅ เก็บ session นักเรียน
    localStorage.setItem(
      "student",
      JSON.stringify({
        studentId: res.data.studentId,
        name: res.data.name,
        classRoom: res.data.classRoom
      })
    );

    // ✅ ไปหน้า dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = "เข้าสู่ระบบ";
    msg.textContent = "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
  }
}
