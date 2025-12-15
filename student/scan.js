// =====================================
// NexAttend — Student Scan
// =====================================

// ถ้าจะต่อ GAS จริง ให้เปิดบรรทัดนี้
// import { callApi } from "../js/api.js";

// ----- DOM -----
const tokenInput = document.getElementById("token");
const btn        = document.getElementById("btn");

const popup    = document.getElementById("popup");
const popIcon  = document.getElementById("popIcon");
const popTitle = document.getElementById("popTitle");
const popText  = document.getElementById("popText");

// ----- MAIN -----
window.checkin = function () {
  const token = tokenInput.value.trim();
  if (!token) {
    alert("กรุณากรอก TOKEN");
    return;
  }

  btn.disabled = true;

  // ================================
  // 🔗 ต่อ Google Apps Script (จริง)
  // ================================
  /*
  callApi("studentCheckin", {
    token,
    studentId: localStorage.getItem("studentId")
  })
    .then(res => handleResult(res.status))
    .catch(() => showError("ระบบขัดข้อง กรุณาลองใหม่"));
  */

  // ===== DEMO (จำลองผลลัพธ์) =====
  const demo = ["OK", "LATE", "DUPLICATE"];
  const status = demo[Math.floor(Math.random() * demo.length)];
  setTimeout(() => handleResult(status), 700);
};

// ----- RESULT HANDLER -----
function handleResult(status) {
  switch (status) {
    case "OK":
      showPopup(
        "✅",
        "เช็คชื่อสำเร็จ",
        "บันทึกสถานะมาเรียนเรียบร้อย",
        "ok",
        true
      );
      break;

    case "LATE":
      showPopup(
        "⏰",
        "เช็คชื่อสำเร็จ",
        "คุณมาสาย ระบบบันทึกสถานะเรียบร้อย",
        "late",
        true
      );
      break;

    default:
      showPopup(
        "❌",
        "ไม่สามารถเช็คชื่อได้",
        "คุณเช็คชื่อไปแล้ว หรือคาบเรียนปิดแล้ว",
        "error",
        false
      );
      break;
  }
}

// ----- POPUP CONTROL -----
function showPopup(icon, title, text, type, redirect) {
  popIcon.textContent  = icon;
  popTitle.textContent = title;
  popText.textContent  = text;

  popIcon.className  = "icon " + type;
  popTitle.className = type;

  popup.style.display = "flex";

  if (redirect) {
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    setTimeout(() => {
      popup.style.display = "none";
      btn.disabled = false;
    }, 2000);
  }
}

// ----- UX: Enter Key -----
tokenInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    window.checkin();
  }
});

// ----- ERROR -----
function showError(msg) {
  showPopup("⚠️", "เกิดข้อผิดพลาด", msg, "error", false);
}
