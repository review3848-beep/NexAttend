// =====================================
// NexAttend — Student Register
// =====================================

import { callApi } from "../js/api.js";

// ===============================
// DOM
// ===============================
const idInput   = document.getElementById("studentId");
const nameInput = document.getElementById("fullName");
const pwInput   = document.getElementById("password");
const pw2Input  = document.getElementById("password2");

const btn = document.getElementById("registerBtn");
const msg = document.getElementById("msg");


// ===============================
// EVENT
// ===============================
btn.addEventListener("click", register);
pw2Input.addEventListener("keydown", e => {
  if (e.key === "Enter") register();
});

// ===============================
// MAIN
// ===============================
async function register() {
  const studentId = idInput.value.trim();
  const fullName  = nameInput.value.trim();
  const password  = pwInput.value.trim();
  const password2 = pw2Input.value.trim();

  msg.textContent = "";

  // ---------- validation ----------
  if (!studentId || !fullName || !password || !password2) {
    showMsg("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  if (password.length < 6) {
    showMsg("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    return;
  }

  if (password !== password2) {
    showMsg("รหัสผ่านไม่ตรงกัน");
    return;
  }

  btn.disabled = true;
  btn.textContent = "กำลังสมัครสมาชิก...";

  try {
    const res = await callApi("studentRegister", {
      studentId,
      fullName,
      password
    });

    if (res.success) {
      showMsg("สมัครสมาชิกสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...", true);

      // redirect ไปหน้า login
      setTimeout(() => {
        location.href = "login.html";
      }, 1500);

    } else {
      showMsg(res.message || "ไม่สามารถสมัครสมาชิกได้");
    }

  } catch (err) {
    console.error(err);
    showMsg("ระบบขัดข้อง กรุณาลองใหม่");
  }

  btn.disabled = false;
  btn.textContent = "สมัครสมาชิก";
}

// ===============================
// HELPER
// ===============================
function showMsg(text, success = false) {
  msg.textContent = text;
  msg.style.color = success ? "#4ade80" : "#fca5a5";
}
