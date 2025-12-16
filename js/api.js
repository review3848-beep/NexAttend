/*********************************
 * NexAttend – API Client
 *********************************/

// 🔴 ใส่ URL Web App จาก Google Apps Script
export const API_BASE =
  "https://script.google.com/macros/s/AKfycbzDdZF4TNU6waNjcuaBGCgFIcb--TOQwIwE5F7Wg8VBq9Y3bkMWnzcOP9bionERVNA4IA/exec";

/**
 * callApi(action, payload)
 * @param {string} action
 * @param {object} payload
 */
export async function callApi(action, payload = {}) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
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
