const express = require("express");
const fs = require("fs");
const app = express();
var cors = require("cors");
const jsonParser = express.json();

let ID = function () {
  return Math.random().toString(36).substr(2, 9);
};

app.use(cors());
app.get("/getData", (request, response) => {
  fs.readFile("./data.json", "utf-8", (error, data) => {
    if (error) throw error;
    response.send(JSON.parse(data));
  });
});

app.post("/deleteData", jsonParser, (req, res) => {
  const id = req.body.id;
  fs.readFile("./data.json", "utf-8", (error, data) => {
    if (error) return res.status("404");
    data = JSON.parse(data);
    let new_data = [];
    for (let elem of data) {
      if (elem.id !== id) {
        new_data.push(elem);
      }
    }
    fs.writeFile("./data.json", JSON.stringify(new_data), (error) => {
      if (error) {
        return res.status(404).json({ message: "Something goes wrong" });
      } else {
        res.send(true);
      }
    });
  });
});

app.post("/editData", jsonParser, (req, res) => {
  console.log("ya tut");
  const id = req.body.id;
  const new_title = req.body.new_title;
  const new_discription = req.body.new_discription;
  const new_text = req.body.new_text;
  fs.readFile("./data.json", "utf-8", (error, data) => {
    if (error) return res.status("404");
    data = JSON.parse(data);
    for (let elem of data) {
      if (elem.id == id) {
        elem.title = new_title;
        elem.discription = new_discription;
        elem.text = new_text;
      }
    }
    console.log(data);

    fs.writeFile("./data.json", JSON.stringify(data), (error) => {
      if (error) {
        return res.status(404).json({ message: "Something goes wrong" });
      } else {
        res.send(true);
      }
    });
  });
});
app.post("/createData", jsonParser, (req, res) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  fs.readFile("./data.json", "utf-8", (error, data) => {
    if (error) return res.status("404");
    data = JSON.parse(data);
    data.push({
      id: ID(),
      date: date  + "-" + month + "-" + year,
      title: req.body.title,
      discription: req.body.discription,
      text: req.body.text,
    });
    fs.writeFile("./data.json", JSON.stringify(data), (error) => {
      if (error) {
        return res.status(404).json({ message: "Something goes wrong" });
      } else {
        res.send(true);
      }
    });
  });
});
console.log("app is working properly");

app.listen(9000);
