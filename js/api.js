export const API_BASE =
  "https://script.google.com/macros/s/AKfycbyNgj59KghdQsxwBN22utiZl7EVJONG21YZ4saKnFJN1I1MQc2cHDw7pmq7paaArlTy2g/exec";

export async function callApi(action, payload = {}) {
  const res = await fetch(API_BASE, {   // ✅ ใช้ตัวแปรให้ตรง
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
