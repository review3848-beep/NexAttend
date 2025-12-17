// student/dashboard.js
import { callApi } from "../js/api.js";

/* ================= SESSION ================= */
const student = JSON.parse(localStorage.getItem("student"));
if (!student || !student.studentId) {
  window.location.href = "login.html";
}

/* ================= DOM ================= */
const nameEl   = document.getElementById("stuName");
const idEl     = document.getElementById("stuId");
const okEl     = document.getElementById("statOk");
const lateEl   = document.getElementById("statLate");
const absEl    = document.getElementById("statAbsent");
const rateEl   = document.getElementById("statRate");

/* ================= INIT ================= */
init();

async function init() {
  nameEl.textContent = student.name || "-";
  idEl.textContent   = student.studentId;

  try {
    const res = await callApi("studentDashboard", {
      studentId: student.studentId
    });

    if (!res || res.success !== true) {
      alert("ไม่สามารถโหลดข้อมูลได้");
      return;
    }

    okEl.textContent   = res.ok;
    lateEl.textContent = res.late;
    absEl.textContent  = res.absent;
    rateEl.textContent = res.rate + "%";

  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
  }
}
