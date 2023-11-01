const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser(userObj) {
  try {
    const hashedPassword = await bcrypt.hash(userObj.password, 10);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, username, password)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *
            `,
      [userObj.email, userObj.username, hashedPassword]
    );
    return user;
  } catch (error) {
    console.error("error from createUser", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    return user;
  } catch (error) {
    console.error("error from getUserByUsername", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE user_id = $1`, [userId]);
    return user;
  } catch (error) {
    console.error("error from getUserById", error);
    throw error;
  }
}

async function updateUserProfile(userId, updatedData) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users SET username = $1, password = $2 WHERE user_id = $3 RETURNING *`,
      [updatedData.username, updatedData.password, userId]
    );
    return user;
  } catch (error) {
    console.error("error from updateUserProfile", error);
    throw error;
  }
}

async function doesUsernameExist(username) {
  try {
    const result = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("error from doesUsernameExist", error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const { rowCount } = await client.query(
      `DELETE FROM users WHERE user_id = $1`,
      [userId]
    );

    if (rowCount === 0) {
      return null;
    }
    return { message: "User Deleted Successfully" };
  } catch (error) {
    console.error("error from deleteUser", error);
    throw error;
  }
}

async function getUserPasswordByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT password FROM users WHERE username = $1`, [
      username,
    ]);
    return user;
  } catch (error) {
    console.error("error from getUserPasswordByUsername", error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateUserProfile,
  doesUsernameExist,
  deleteUser,
  getUserPasswordByUsername,
};
