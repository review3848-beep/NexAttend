// =====================================
// NexAttend — Student History
// =====================================

import { callApi } from "../js/api.js";

// ----- SESSION -----
const studentId = localStorage.getItem("studentId");
if (!studentId) {
  location.href = "login.html";
}

// ----- DOM -----
const tbody   = document.getElementById("historyBody");
const msgEl   = document.getElementById("historyMsg");
const filterDate = document.getElementById("filterDate");   // optional
const filterSub  = document.getElementById("filterSubject"); // optional

// ----- INIT -----
loadHistory();

// ===============================
// LOAD HISTORY
// ===============================
async function loadHistory() {
  setMsg("กำลังโหลดข้อมูล...");
  try {
    const res = await callApi("studentHistory", { studentId });

    if (!res.success || !res.data || res.data.length === 0) {
      tbody.innerHTML = "";
      setMsg("ยังไม่มีประวัติการเข้าเรียน");
      return;
    }

    renderTable(res.data);
    setMsg("");
  } catch (e) {
    console.error(e);
    setMsg("เกิดข้อผิดพลาดในการโหลดข้อมูล");
  }
}

// ===============================
// RENDER TABLE
// ===============================
function renderTable(rows) {
  tbody.innerHTML = "";

  rows.forEach(r => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${r.date || "-"}</td>
      <td>${r.subject || "-"}</td>
      <td>${r.teacher || "-"}</td>
      <td>
        <span class="badge ${badgeClass(r.status)}">
          ${statusLabel(r.status)}
        </span>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ===============================
// FILTER (OPTIONAL)
// ===============================
if (filterDate || filterSub) {
  [filterDate, filterSub].forEach(el => {
    if (el) el.addEventListener("change", applyFilter);
  });
}

function applyFilter() {
  const dateVal = filterDate?.value || "";
  const subVal  = filterSub?.value.toLowerCase() || "";

  const rows = [...tbody.querySelectorAll("tr")];

  rows.forEach(tr => {
    const tds = tr.querySelectorAll("td");
    const date = tds[0].textContent;
    const sub  = tds[1].textContent.toLowerCase();

    const show =
      (!dateVal || date === dateVal) &&
      (!subVal || sub.includes(subVal));

    tr.style.display = show ? "" : "none";
  });
}

// ===============================
// HELPERS
// ===============================
function badgeClass(status) {
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
    default:       return status || "-";
  }
}

function setMsg(text) {
  if (msgEl) msgEl.textContent = text;
}
