const express = require('express');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:', (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite");
});

db.serialize(function () {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Country " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
    console.log(row.id + ": " + row.info);
  });
});

const app = express();

app.get('/api/test', (req, res) => {
  var test = { text: "Hello world from the backend" };

  res.json(test);
});

app.get('/api/countries', (req, res) => {
  /*
  let sql = 'SELECT * FROM lorem'
  let query = db.run(sql, (err, results) => {
    if (err) console.error(err.message);
    else {
      console.log(results);
      res.send('Countries fetched');
    }
  })
  */
  let countries = {}
  db.all("SELECT rowid AS id, info FROM lorem", function (err, results) {
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
