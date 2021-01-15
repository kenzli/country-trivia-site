const express = require('express');

const request = require('request');

var countries = [];


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
  
      console.log("this should be second");
      db.run("CREATE TABLE countrydata (name TEXT, population INT, size INT)");
  
      var sql_line = db.prepare("INSERT INTO countrydata VALUES (?,?,?)");
  
      console.log(countries[2]);
  
      for (var i = 0; i < countries.length; i++) {
        sql_line.run(countries[i]["name"], countries[i]["population"], countries[i]["area"]);
      }
      sql_line.finalize();
  
      db.each("SELECT rowid AS id, name, population, size FROM countrydata", (err, row) => {
        console.log(row.id + ": " + row.name + " - Pop: " + row.population + " - Size: " + row.size);
      });
    });
  });
}

initCountries();

const app = express();

app.get('/api/test', (req, res) => {
  var test = { text: "Hello world from the backend" };

  res.json(test);
});

app.get('/api/countries', (req, res) => {

  db.all("SELECT rowid AS id, name FROM countrydata", (err, results) => {
    console.log(results);
    res.send(results);
  });

});


const port = 5000;

app.listen(port, () => console.log(`Server started: port ${port}`));

/*
db.close((err) => {
  if (err) console.error(err.message);
  else console.log("Closed SQLite");
});
*/
