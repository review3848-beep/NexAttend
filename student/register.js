// student/register.js
import { callApi } from "../js/api.js";

/* ================= DOM ================= */
const form = document.getElementById("registerForm");
const btn  = document.getElementById("submitBtn");

const studentId = document.getElementById("studentId");
const firstName = document.getElementById("firstName");
const lastName  = document.getElementById("lastName");
const password  = document.getElementById("password");
const confirmPw = document.getElementById("confirm");

const errStudentId = document.getElementById("err-studentId");
const errPassword  = document.getElementById("err-password");
const errConfirm   = document.getElementById("err-confirm");

/* ================= helpers ================= */
function clearErrors() {
  errStudentId.textContent = "";
  errPassword.textContent  = "";
  errConfirm.textContent   = "";
}

function setLoading(on) {
  if (on) {
    btn.disabled = true;
    btn.classList.add("loading");
    btn.textContent = "กำลังสมัคร...";
  } else {
    btn.disabled = false;
    btn.classList.remove("loading");
    btn.textContent = "สมัครสมาชิก";
  }
}

/* ================= UX ================= */
window.addEventListener("load", () => {
  studentId.focus();
});

/* ================= submit ================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const sid = studentId.value.trim();
  const pw  = password.value;
  const cf  = confirmPw.value;

  /* ---------- validation ---------- */
  if (!sid) {
    errStudentId.textContent = "กรุณากรอกรหัสนักเรียน";
    studentId.focus();
    return;
  }

  if (!/^\d{5,}$/.test(sid)) {
    errStudentId.textContent = "รูปแบบรหัสนักเรียนไม่ถูกต้อง";
    studentId.focus();
    return;
  }

  if (pw.length < 4) {
    errPassword.textContent = "รหัสผ่านอย่างน้อย 4 ตัวอักษร";
    password.focus();
    return;
  }

  if (pw !== cf) {
    errConfirm.textContent = "รหัสผ่านไม่ตรงกัน";
    confirmPw.focus();
    return;
  }

  /* ---------- submit ---------- */
  setLoading(true);

  try {
    const res = await callApi("studentRegister", {
      studentId: sid,
      password: pw
    });

    setLoading(false);

    if (!res || res.success !== true) {
      // error จาก GAS
      errStudentId.textContent =
        res?.message || "ไม่สามารถสมัครได้";
      return;
    }

    /* ---------- success ---------- */
    // ดึงชื่อจากชีตมาแสดง
    firstName.value = res.data.firstName || "";
    lastName.value  = res.data.lastName  || "";

    alert(
      `สมัครสำเร็จ 🎉\nยินดีต้อนรับ ${res.data.firstName} ${res.data.lastName}`
    );

    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    setLoading(false);
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
});
