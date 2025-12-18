export const API_BASE =
  "https://script.google.com/macros/s/AKfycbwRI_oHtLz2FRG43uHmUIl2lgRSdjcZ30ShfmhDOSS8mzMsnHRPBANFcpGcc0_aq8LihA/exec";

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
