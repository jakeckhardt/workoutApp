const express = require("express");
const mysql = require("mysql");

const app = express();
let workoutPart;
let workouts = [];

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "workouts",
  port: 3306
});

function search(item){
  workoutPart = item;
  workouts = [];
  connection.query('SELECT * FROM `workouts` WHERE `list_muscleTargeted` = "' + item + '"', function(err, rows) {
    if(err) {
      console.log(err);
      return
    }

    rows.forEach(function(result){
      workouts.push(result.list_title);
    });
  });
};

search("triceps");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index")
});

app.listen(3000, () => {
  console.log("The application is running.")
});
