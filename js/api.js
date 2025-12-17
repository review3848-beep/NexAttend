/*********************************
 * NexAttend – API Client
 *********************************/

// 🔴 ใส่ URL Web App จาก Google Apps Script
export const API_BASE =
  "https://script.google.com/macros/s/AKfycbxjIlnY1vWSfp8fybwZS0vJlDsS6j2v0ZMfajc3Hk6pO6499ReBz_5b2UvcAcWYyxeewg/exec";

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
