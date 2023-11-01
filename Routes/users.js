const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authRequired, requireUser } = require("./utils");
const userAdapter = require("../Database/adapters/users.js");
const usersRouter = express.Router();
const secretKey = process.env.JWT_SECRET;

usersRouter.get("/users/me", authRequired, async (req, res) => {
  const user = await userAdapter.getUserByUsername(req.user.username);
  if (!user) {
    res.status(401).json({ error: "No User Found" });
  } else {
    res.send({
      success: true,
      message: "You are Authorized",
      user: req.user,
    });
  }
});

usersRouter.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userAdapter.getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ error: "User Not Found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401).json({ error: "Invalid Password" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
    },
    secretKey,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    signed: true,
  });

  res.status(200).json({ message: "Login Successful" });
});
usersRouter.post("/users/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userAdapter.getUserByUsername(username);

    user && res.status(200).json(user);
  } catch (error) {
    console.error("error from /users/:username", error);
    res.status(404).json({ error: "User Not Found" });
  }
});

usersRouter.get("/users/id/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userAdapter.getUserById(userId);

    user && res.status(200).json(user);
  } catch (error) {
    console.error("error from /users/:id", error);
    res.status(404).json({ error: "User Not Found" });
  }
});

usersRouter.get("/check-username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const usernameExists = await userAdapter.doesUsernameExist(username);

    console.log(usernameExists);

    if (usernameExists) {
      res.status(200).json({ message: "Username Already Exists" });
    } else {
      res.status(200).json({ message: "Username Is Available" });
    }
  } catch (error) {
    console.error("error from /check-username/:username", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

usersRouter.get("/password/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userPassword = await userAdapter.getUserPasswordByUsername(username);

    if (userPassword) {
      res.status(200).json(userPassword);
    } else {
      res.status(404).json({ error: "User Does Not Exist" });
    }
  } catch (error) {
    console.error("error from GET /password/:username");
    res.status(500).json({ error: "Internal Service Error" });
  }
});

usersRouter.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userAdapter.deleteUser(userId);

    if (deletedUser) {
      res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ error: "User Does Not Exist" });
    }
  } catch (error) {
    console.error("error from Delete /users/:userId", error);
    res.status(500).json({ error: "Failed to Delete User" });
  }
});

usersRouter.put("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    const updatedUser = await userAdapter.updateUserProfile(
      userId,
      updatedUserData
    );

    updatedUser
      ? res.status(200).json(updatedUser)
      : res.status(404).json({ error: "User Not Found" });
  } catch (error) {
    console.error("error from PUT /users/:userId", error);
    res.status(500).json({ error: "Failed to Update User" });
  }
});

module.exports = usersRouter;
