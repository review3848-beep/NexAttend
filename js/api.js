/*********************************
 * NexAttend – API Client
 *********************************/

// 🔴 ใส่ URL Web App จาก Google Apps Script
export const API_BASE =
  "https://script.google.com/macros/s/AKfycbxSbNmvARRy5-EEslzN2r2MHSq5r5vZrP3_Jg29B5oKSUTwg8Q-jweH9rKVNfrPiNhF3g/exec";

/**
 * callApi(action, payload)
 * @param {string} action
 * @param {object} payload
 */
export async function callApi(action, payload = {}) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action,
      ...payload
    })
  });

  if (!res.ok) {
    throw new Error("Network error");
  }

  return res.json();
}
