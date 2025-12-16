// student/register.js
import { callApi } from "../js/api.js";

/* ===== DOM ===== */
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

/* ===== helpers ===== */
function clearErrors() {
  errStudentId.textContent = "";
  errPassword.textContent  = "";
  errConfirm.textContent   = "";
}

function setLoading(on) {
  btn.disabled = on;
  btn.textContent = on ? "กำลังสมัคร..." : "สมัครสมาชิก";
}

/* ===== auto focus ===== */
window.addEventListener("load", () => {
  studentId.focus();
});

/* ===== lookup student ===== */
studentId.addEventListener("blur", async () => {
  clearErrors();
  const sid = studentId.value.trim();
  if (!sid) return;

  try {
    const res = await callApi("studentLookup", { studentId: sid });

    if (!res.success) {
      errStudentId.textContent = res.message;
      firstName.value = "";
      lastName.value  = "";
      return;
    }

    firstName.value = res.data.firstName;
    lastName.value  = res.data.lastName;

  } catch {
    errStudentId.textContent = "ไม่สามารถตรวจสอบข้อมูลได้";
  }
});

/* ===== submit ===== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const sid = studentId.value.trim();
  const pw  = password.value;
  const cf  = confirmPw.value;

  if (!sid) {
    errStudentId.textContent = "กรุณากรอกรหัสนักเรียน";
    return;
  }

  if (!firstName.value) {
    errStudentId.textContent = "รหัสนักเรียนไม่อยู่ในระบบ";
    return;
  }

  if (pw.length < 4) {
    errPassword.textContent = "รหัสผ่านอย่างน้อย 4 ตัวอักษร";
    return;
  }

  if (pw !== cf) {
    errConfirm.textContent = "รหัสผ่านไม่ตรงกัน";
    return;
  }

  setLoading(true);

  try {
    const res = await callApi("studentRegister", {
      studentId: sid,
      password: pw
    });

    setLoading(false);

    if (!res.success) {
      errStudentId.textContent = res.message || "สมัครไม่สำเร็จ";
      return;
    }

    alert(`สมัครสำเร็จ 🎉\nยินดีต้อนรับ ${firstName.value} ${lastName.value}`);
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    setLoading(false);
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
});
