const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors("*"));
const key = require("../authdetails/auth");
app.post("/register", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, key);
  res.send(token);
});
app.listen(3012, () => {
  console.log("register user service started");
});
