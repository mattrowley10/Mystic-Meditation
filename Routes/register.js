const express = require("express");
const registerRouter = express.Router();
const { createUser } = require("../Database/adapters/users.js");
// /api/register
registerRouter.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = await createUser({
      email,
      username,
      password,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("error from /register", error);
    res.status(500).json({ error: "Registration Failed" });
  }
});

module.exports = registerRouter;
