const express = require("express");
const app = express();
const students = ["Tamuno", "Piriye", "Joel", "Ogbonna"];
const bodyParser = require("body-parser");
const studentroutes = require("./routes/studentRoutes");

app.use(bodyParser.json());
app.use("/students", studentroutes);

app.get("/", (req, res) => {
  
  return res.json(students);
});

module.exports = app;