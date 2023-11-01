export async function getAllMeditations() {
  try {
    const response = await fetch("/api/meditations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error Getting Meditations");
  }
}
