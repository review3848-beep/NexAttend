// ===============================
// Student Scan - NexAttend
// ===============================

// DOM
const tokenInput = document.getElementById("token");
const btn        = document.getElementById("btn");

const popup      = document.getElementById("popup");
const popIcon    = document.getElementById("popIcon");
const popTitle   = document.getElementById("popTitle");
const popText    = document.getElementById("popText");

// ===============================
// MAIN ACTION
// ===============================
function checkin() {
  const token = tokenInput.value.trim();

  if (!token) {
    alert("กรุณากรอก TOKEN");
    return;
  }

  btn.disabled = true;

  // -------------------------------
  // 🔗 ตรงนี้ต่อ Google Apps Script
  // -------------------------------
  // ตัวอย่าง payload
  /*
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "studentCheckin",
      token: token,
      studentId: localStorage.getItem("studentId")
    })
  })
  .then(res => res.json())
  .then(data => handleResult(data.status))
  .catch(() => showError("ระบบขัดข้อง กรุณาลองใหม่"));
  */

  // ===== DEMO (จำลองผลลัพธ์) =====
  const demoResults = ["OK", "LATE", "DUPLICATE"];
  const status = demoResults[Math.floor(Math.random() * demoResults.length)];

  setTimeout(() => handleResult(status), 800);
}

// ===============================
// HANDLE RESULT
// ===============================
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

// ===============================
// POPUP CONTROL
// ===============================
function showPopup(icon, title, text, type, redirect = true) {
  popIcon.textContent  = icon;
  popTitle.textContent = title;
  popText.textContent  = text;

  popIcon.className  = "icon " + type;
  popTitle.className = type;

  popup.style.display = "flex";

  // ---- success / late → กลับ dashboard
  if (redirect) {
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  }
  // ---- error → ให้ลองใหม่
  else {
    setTimeout(() => {
      popup.style.display = "none";
      btn.disabled = false;
    }, 2000);
  }
}

// ===============================
// OPTIONAL: ENTER KEY
// ===============================
tokenInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    checkin();
  }
});
