require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const registerRouter = require("./Routes/register.js");
const userRouter = require("./Routes/users.js");
const meditationsRouter = require("./Routes/meditations.js");

const client = require("./Database/client.js");
client.connect();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, "./mystic_meditation", "dist")));

app.get("/", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./mystic_meditation", "dist", "index.html")
  );
});

// /api/register/
app.use("/api", registerRouter);
// /api/users/
app.use("/api", userRouter);
// /api/meditations/
app.use("/api", meditationsRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
