const express = require("express");
const app = express();
const mysql = require("./config/mysql");
var cors = require('cors')



// routes

const RoutesUsers = require("./routes/Users");

app.get("/", (req, res) => {
  res.json({ statusAPI: "API is running" });
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(RoutesUsers)
// res send 404 express error
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
  next();
});



app.listen(3000, async () => {
  try {
    await mysql.checkDB();
    console.log("API is running");
  } catch (err) {
    console.log(err);
  }
});
