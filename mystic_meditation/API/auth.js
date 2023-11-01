export async function getToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in the cookie");
    }
    return token;
  } catch (error) {
    console.error("Error Fetching Token");
    throw error;
  }
}
export async function getUserData() {
  try {
    const response = await fetch("/api/users/me");
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      throw new Error("Failed to fetch User Data");
    }
  } catch (error) {
    console.error("Failed to fetch User Data");
    throw error;
  }
}
