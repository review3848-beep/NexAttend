// ===============================
// Student Scan - NexAttend (REAL)
// ===============================

import { callApi } from "../js/api.js";

/* ================= DOM ================= */
const tokenInput = document.getElementById("token");
const btn        = document.getElementById("btn");

const popup      = document.getElementById("popup");
const popIcon    = document.getElementById("popIcon");
const popTitle   = document.getElementById("popTitle");
const popText    = document.getElementById("popText");

/* ================= SESSION CHECK ================= */
const student = JSON.parse(localStorage.getItem("student"));
if (!student || !student.studentId) {
  window.location.href = "login.html";
}

/* ================= UX ================= */
tokenInput.focus();

/* ================= MAIN ACTION ================= */
btn.addEventListener("click", checkin);

async function checkin() {
  const token = tokenInput.value.trim().toUpperCase();

  if (!token) {
    showPopup("⚠️", "กรุณากรอก Token", "ต้องกรอก Token ก่อนเช็คชื่อ", "error", false);
    return;
  }

  btn.disabled = true;
  btn.textContent = "กำลังเช็คชื่อ...";

  try {
    const res = await callApi("studentCheckin", {
      studentId: student.studentId,
      token
    });

    btn.disabled = false;
    btn.textContent = "เช็คชื่อ";

    if (!res || res.success !== true) {
      showPopup(
        "❌",
        "เช็คชื่อไม่สำเร็จ",
        res?.message || "คุณเช็คชื่อไปแล้ว หรือคาบเรียนปิดแล้ว",
        "error",
        false
      );
      return;
    }

    // OK / LATE
    if (res.status === "OK") {
      showPopup(
        "✅",
        "เช็คชื่อสำเร็จ",
        "บันทึกสถานะมาเรียนเรียบร้อย",
        "ok",
        true
      );
    } else if (res.status === "LATE") {
      showPopup(
        "⏰",
        "เช็คชื่อสำเร็จ",
        "คุณมาสาย ระบบบันทึกสถานะเรียบร้อย",
        "late",
        true
      );
    }

  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = "เช็คชื่อ";
    showPopup("❌", "ระบบขัดข้อง", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์", "error", false);
  }
}

/* ================= POPUP ================= */
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
    }, 1800);
  } else {
    setTimeout(() => {
      popup.style.display = "none";
      tokenInput.focus();
    }, 2200);
  }
}

/* ================= ENTER KEY ================= */
tokenInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkin();
});
