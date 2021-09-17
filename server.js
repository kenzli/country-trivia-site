const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
require('dotenv').config()
//const { default: Country } = require('./client/src/components/Country');
const port = process.env.PORT || 5000;
var countries = [];
var countryCount = 0;
const Country = require('./db');

app.use(express.static(path.join(__dirname, 'client/build')));

function initMongoCountries() {
  console.log('Inside initmongo');
  request('https://restcountries.eu/rest/v2/all', { json: true }, (err, res, body) => {
    console.log('inside req');
    if (err) { return console.log(err); }
    countries = body;

    for (var i = 0; i < countries.length; i++) {
      if (countries[i]["population"] !== null && countries[i]["area"] !== null) {
        const country = new Country({
          name: countries[i]["name"],
          population: countries[i]["population"],
          area: countries[i]["area"],
        });
        console.log("about to save country");

        country.save().then(savedCountry => {
          console.log(savedCountry);
        })
      }
    }

    console.log("Countries initialized");
  });
}

console.log("Counting countries:");
Country.count().then((count) => {
  console.log(count);
});
// initMongoCountries();


app.listen(port, () => console.log(`Server started: port ${port}`));

app.get('/api/countryNum', (req, res) => {
  Country.count().then((countryCount) => {
    console.log("FOUND COUNTRY COUNT: ", countryCount);
    res.json(countryCount);
  });
});

app.get('/api/countries', (req, res) => {
  Country.find({}).then((results) => {
    console.log("GOT ALL COUNTRIES: ", results);
    res.send(results);
  })
});

app.get('/api/randcountry', (req, res) => {
  Country.aggregate([{$sample: {size: 1}}]).then(country => {
    console.log('GOT RANDOM COUNTRY');
    console.log(country);
    res.json(country);
  })
});


app.get('/api/countries/:id', (req, res) => {
  Country.findById(req.params.id).then(country => {
    response.json(country);
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});





