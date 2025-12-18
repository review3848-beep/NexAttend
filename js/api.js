export const API_BASE =
  "https://script.google.com/macros/s/AKfycbwv3l2UIDdo7WHeYd9NonQz9fxQN4puZyY2RbrEi8cPPdtS12B0uo2Ay6_ivpg36CoNXw/exec";

export async function callApi(action, payload = {}) {
  const res = await fetch(API_BASE, {   // ✅ ใช้ให้ตรงชื่อ
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action,
      ...payload
    })
  });

  return await res.json();
}
