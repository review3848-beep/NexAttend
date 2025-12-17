export const API_BASE =
  "https://script.google.com/macros/s/AKfycbx7En0A3MoqZHDsdWSvSoca73VdEKZxwIiPr3bJUsZYi47WRG2HPKfQCTXD8WQy-9bgDQ/exec";

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

  return await res.json();
}

