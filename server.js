const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const port = process.env.PORT || 5000;
var countries = [];
var countryCount = 0;

app.use(express.static(path.join(__dirname, 'client/build')));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('', (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite");
});

function initCountries() {
  request('https://restcountries.eu/rest/v2/all', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    countries = body;
    db.serialize(() => {
  
      db.run("CREATE TABLE countrydata (name TEXT, population INT, size INT)");
      //db.run("CREATE TABLE countrydata (name TEXT, population INT, size INT)");
      var sql_line = db.prepare("INSERT INTO countrydata (name , population , size) VALUES (?,?,?)");
  
      //console.log(countries[2]);
  
      for (var i = 0; i < countries.length; i++) {
        if (countries[i]["population"] !== null && countries[i]["area"] !== null) {
          sql_line.run(countries[i]["name"], countries[i]["population"], countries[i]["area"]);
          countryCount++;
        }
      }
      sql_line.finalize();

      console.log("Countries initialized");
      db.each("SELECT rowid AS id, name, population, size FROM countrydata", (err, row) => {
        //console.log(row.id + ": " + row.name + " - Pop: " + row.population + " - Size: " + row.size);
      });
    });
    app.listen(port, () => console.log(`Server started: port ${port}`));
  });
}

initCountries();

app.get('/api/countryNum', (req, res) => {
  res.json(countryCount);
});

app.get('/api/countries', (req, res) => {
  db.all("SELECT * FROM countrydata", (err, results) => {
    if (err) { return console.log(err); }
    res.send(results);
  });
});


app.get('/api/countries/:id', (req, res) => {
  db.all(`SELECT rowid, * FROM countrydata WHERE rowid = ${req.params["id"]}`, (err, results) => {
    if (err) { return console.log(err); }
    console.log(results);
    res.send(results);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});





