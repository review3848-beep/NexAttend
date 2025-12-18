import { callApi } from "../js/api.js";

const idEl  = document.getElementById("studentId");
const pwEl  = document.getElementById("password");
const msgEl = document.getElementById("msg");

window.login = async function () {
  const studentId = idEl.value.trim();
  const password  = pwEl.value.trim();

  if (!studentId || !password) {
    msgEl.textContent = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  msgEl.textContent = "กำลังเข้าสู่ระบบ...";

  try {
    const res = await callApi("studentLogin", {
      studentId,
      password
    });

    if (!res || res.success !== true) {
      msgEl.textContent = res?.message || "เข้าสู่ระบบไม่สำเร็จ";
      return;
    }

    // ✅ เก็บ session ให้หน้าอื่นใช้
    localStorage.setItem(
      "student",
      JSON.stringify({
        studentId: res.data.studentId,
        name: res.data.name
      })
    );

    // ✅ ไป dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    msgEl.textContent = "ไม่สามารถเชื่อมต่อระบบได้";
  }
};
