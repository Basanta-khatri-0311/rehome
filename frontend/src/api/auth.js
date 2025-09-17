const BASE_URL = "http://127.0.0.1:5050/api/auth";

export async function registerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { message: "Network error" };
  }
}

export async function loginUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { message: "Network error" };
  }
}
