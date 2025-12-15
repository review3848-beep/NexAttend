// =====================================
// NexAttend — Student Dashboard
// =====================================

import { callApi } from "../js/api.js";

// ===============================
// SESSION CHECK
// ===============================
const studentId = localStorage.getItem("studentId");
if (!studentId) {
  location.href = "login.html";
}

// ===============================
// DOM
// ===============================
const elName   = document.getElementById("stuName");
const elId     = document.getElementById("stuId");

const elOk     = document.getElementById("statOk");
const elLate   = document.getElementById("statLate");
const elAbsent = document.getElementById("statAbsent");
const elRate   = document.getElementById("statRate");

const elRecent = document.getElementById("recentList"); // optional

// ===============================
// INIT
// ===============================
loadDashboard();

// ===============================
// LOAD DASHBOARD DATA
// ===============================
async function loadDashboard() {
  try {
    const res = await callApi("studentDashboard", { studentId });

    if (!res.success) {
      alert("ไม่สามารถโหลดข้อมูลได้");
      return;
    }

    // ----- basic info -----
    if (elName) elName.textContent = res.name || "-";
    if (elId)   elId.textContent   = studentId;

    // ----- stats -----
    if (elOk)     elOk.textContent     = res.ok ?? 0;
    if (elLate)   elLate.textContent   = res.late ?? 0;
    if (elAbsent) elAbsent.textContent = res.absent ?? 0;
    if (elRate)   elRate.textContent   = (res.rate ?? 0) + "%";

    // ----- recent history (optional) -----
    if (elRecent && Array.isArray(res.recent)) {
      renderRecent(res.recent);
    }

  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
  }
}

// ===============================
// RENDER RECENT ATTENDANCE
// ===============================
function renderRecent(list) {
  if (list.length === 0) {
    elRecent.innerHTML = "<div class='empty'>ยังไม่มีข้อมูลการเข้าเรียน</div>";
    return;
  }

  elRecent.innerHTML = "";

  list.forEach(r => {
    const div = document.createElement("div");
    div.className = "recent-item";

    div.innerHTML = `
      <div class="date">${r.date || "-"}</div>
      <div class="subject">${r.subject || "-"}</div>
      <div class="status ${statusClass(r.status)}">
        ${statusLabel(r.status)}
      </div>
    `;

    elRecent.appendChild(div);
  });
}

// ===============================
// HELPERS
// ===============================
function statusClass(status) {
  switch ((status || "").toUpperCase()) {
    case "OK":     return "ok";
    case "LATE":   return "late";
    case "ABSENT": return "absent";
    default:       return "";
  }
}

function statusLabel(status) {
  switch ((status || "").toUpperCase()) {
    case "OK":     return "มาเรียน";
    case "LATE":   return "สาย";
    case "ABSENT": return "ขาด";
    default:       return "-";
  }
}
