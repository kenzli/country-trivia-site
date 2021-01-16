import React from 'react';
import Country from './components/Country.js';
import Score from './components/Score.js';
import HiLoButton from './components/HiLoButton.js';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './pages/home.js';
import Game from './pages/game.js';
import End from './pages/end.js';
import { useHistory } from "react-router-dom";
import { browserHistory } from 'react-router';


function getRandInt(exclude = -1) {
  var countryNum = 250
  var rand = null;
  while (rand === null || rand === exclude) {
    rand = Math.round(Math.random() * (countryNum - 1));
  }
  return rand;
}

class App extends React.Component {


  state = {
    page: "home",
    country1: {
      dbId: 0,
      name: "",
      population: "",
      size: ""
    },
    country2: {
      db_id: 0,
      name: "",
      population: "",
      size: ""
    },
    score: 0,
    highScore: 0
  }

  //index, dbId, name, population, size
  setCountry = () => {
    if (this.state.page === "home" || this.state.page === "end") { // New game
      var x1 = getRandInt();
      var x2 = getRandInt(x1);
      fetch(`/api/countries/${x1}`)
        .then(res => res.json())
        .then(country1data => this.setState({ country1: country1data[0] }, () => console.log('Fetch 1 Successful', country1data)));

      fetch(`/api/countries/${x2}`)
        .then(res => res.json())
        .then(country2data => this.setState({ country2: country2data[0] }, () => console.log('Fetch 2 Successful', country2data)));

      this.setState({ page: "game" });
      this.setState({ score: 0 });


    } else if (this.state.page === "game") { // In a game - get next country
      var newInt = getRandInt(this.state.country2.rowid);
      this.setState({ country1: this.state.country2 });

      fetch(`/api/countries/${newInt}`)
        .then(res => res.json())
        .then(country2data => this.setState({ country2: country2data[0] }, () => {
          console.log('Fetch New Successful', country2data);
          console.log('Country 1: ', this.state.country1);
          console.log('Country 2: ', this.state.country2);
        }));

    }
  }
 
  HiLoPress = (correct) => { // Correct Press
    if (correct === 1) {
      console.log("Correct!");
      this.setState({ score: (this.state.score + 1) }, () => {
        if (this.state.score >= this.state.highScore) this.setState({ highScore: this.state.score });
      });
      this.setCountry();
    } else {
      console.log("Incorrect!");
      this.setState( {page: "end"} );
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Country Guesser</h1>
          <Route path="/" exact component={Home} />
          <Route path="/game" exact>

            <Game page={this.state.page} setCountry={this.setCountry} />
            <h2> Country 1</h2>
            <Country country={this.state.country1} index={1} />
            <h2> Country 2</h2>
            <Country country={this.state.country2} index={2} />
            <HiLoButton country1={this.state.country1} country2={this.state.country2} HiLoPress={this.HiLoPress} />

          </Route>
          <Route path="/end" exact>
            <End country={this.state.country2}></End>
          </Route>
          <Score score={this.state.score} highScore={this.state.highScore} />
        </div>
      </Router>
    );
  }
}


export default App;
