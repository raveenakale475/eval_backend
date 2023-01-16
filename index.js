const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

const { connection } = require("./config/db");

const { authRouter } = require("./routes/auth.route");
const { productPost } = require("./routes/post.route");

app.use(cors());

app.use(express.json());

app.use("/users", authRouter);

app.use("/posts", productPost);

app.get("/", (req, res) => {
  res.send("Welcome to the Application");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (err) {
    console.error(err);
  }
});
