const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
require("dotenv").config();
const newla = require("mongoose");
newla.connect(process.env.NEVLA_URI, {}, () => {
  console.log("newle se baat karli hai wo saap khalega");
});
const User = require("./User");
const LvlUser = require("./LvlUser");
app.get("/lb", async (req, res) => {
  const { sort } = req.query;
  const nonsort = sort === "highest" ? "won" : "highest";
  const usrs = await User.find({}).sort([
    [sort, -1],
    [nonsort, -1],
  ]);
  res.send(usrs);
});
app.get("/level", async (req, res) => {
  const { id } = req.query;
  const usr = await LvlUser.findOne({ idE: id });
  if (!usr) {
    return res.send("invalid user id");
  } else {
    return res.send(usr);
  }
});
app.get("/leaderboard-users", async (req, res) => {
  const usrs = await LvlUser.find({}).sort([
    ["level", -1],
    ["xp", -1],
  ]);
  res.send(usrs);
});
app.listen(port, console.log(`listening on port ${port}`));
