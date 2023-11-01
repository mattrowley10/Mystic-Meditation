export async function getUserInfo(username) {
  try {
    const response = await fetch(`/api/users/username/${username}`, {
      method: "GET",
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch user information");
    }
  } catch (error) {
    console.error("error from getUserInfo");
  }
}

export async function getUserById(userId) {
  try {
    const response = await fetch(`/api/users/id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("error from getUserById");
  }
}
