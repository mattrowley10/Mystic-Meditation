const client = require("../client");

async function insertMeditation(title, description, duration, content) {
  try {
    const {
      rows: [meditations],
    } = await client.query(
      `
        INSERT INTO meditations (title, description, duration, content)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (title) DO NOTHING 
        RETURNING *
        `,
      [title, description, duration, content]
    );
    return meditations;
  } catch (error) {
    console.error("Error Inserting Meditation", error);
    throw error;
  }
}

async function getMeditationById(meditationId) {
  try {
    const {
      rows: [meditations],
    } = await client.query(
      `SELECT * FROM meditations WHERE meditation_id = $1`,
      [meditationId]
    );
    return meditations;
  } catch (error) {
    console.error("Error retrieving meditation", error);
    throw error;
  }
}

async function listMeditations() {
  try {
    const { rows: meditations } = await client.query(
      `SELECT * FROM meditations`
    );
    return meditations;
  } catch (error) {
    console.error("Error listing meditations", error);
    throw error;
  }
}

async function updateMeditation(
  meditationId,
  newTitle,
  newDuration,
  newDescription,
  newContent
) {
  try {
    const {
      rows: [meditations],
    } = await client.query(
      `UPDATE meditations SET title = $1, duration = $2, description = $3, content = $4 WHERE meditation_id = $5`,
      [meditationId, newTitle, newDuration, newDescription, newContent]
    );
    return meditations;
  } catch (error) {
    console.error("Error updating meditation", error);
    throw error;
  }
}

async function deleteMeditation(meditationId) {
  try {
    const result = await client.query(
      `DELETE FROM meditations WHERE meditation_id = $1`,
      [meditationId]
    );
    return result;
  } catch (error) {
    console.error("Error deleting meditation", error);
    throw error;
  }
}

async function searchMeditation(criteria) {
  try {
    const {
      rows: [meditations],
    } = await client.query(
      `
    SELECT * FROM meditations WHERE title = $1
  `,
      [criteria]
    );
    return meditations;
  } catch (error) {
    console.error("Error searching meditations", error);
    throw error;
  }
}

module.exports = {
  insertMeditation,
  getMeditationById,
  listMeditations,
  updateMeditation,
  deleteMeditation,
  searchMeditation,
};
