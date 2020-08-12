const express = require("express");
var mysql = require("mysql");
const cors = require("cors");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password : '123456',
  database: "myClinic",
});

//Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Create DB
app.get("/createdb/:id", (req, res) => {
  let sql = `CREATE DATABASE ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");
  });
});

app.listen("3000", () => {
  console.log("Server is running on port: 3000");
});

//Create new clinic
app.post("/newClinic", (req, res) => {
  console.log(req.body.email);
  let clinic = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  };
  let sql = "INSERT INTO clinic SET ?";
  let query = db.query(sql, clinic, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Clinic added...");
    res.end();
  });
});

//Select clinic
app.post("/getClinic", (req, res) => {
  console.log(req.body);
  let email = '"' + req.body.email + '"';
  console.log(email);
  let sql = `SELECT * FROM clinic WHERE email = ${email}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    res.end();
  });
});

//Create new record
app.post("/newRecord", (req, res) => {
  console.log(req.body.email);
  let clinic = {
    email: req.body.email,
    doctor_name: req.body.doctor_name,
    patient_name: req.body.patient_name,
    diagnosis: req.body.diagnosis,
    medication: req.body.medication,
    fee: req.body.fee,
    date_time: req.body.date_time,
    follow_up: req.body.follow_up,
  };
  let sql = "INSERT INTO record SET ?";
  let query = db.query(sql, clinic, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Record added...");
    res.end();
  });
});

//Select record
app.post("/getRecord", (req, res) => {
  console.log(req.body);
  let email = '"' + req.body.email + '"';
  console.log(email);
  let sql = `SELECT * FROM record WHERE email = ${email}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    res.end();
  });
});
