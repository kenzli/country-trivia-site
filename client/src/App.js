import React from 'react';
import Country from './components/Country.js';
import Score from './components/Score.js';
import HiLoButton from './components/HiLoButton.js';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Game from './pages/Game.js';
import End from './pages/End.js';


function getRandInt(countryNum = 240, exclude = -1) {
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
    countryNum: 240,
    highScore: 0,
    mode: "population"
  }

  //index, dbId, name, population, size
  setCountry = () => {
    if (this.state.page === "home" || this.state.page === "end") { // New game
      var x1 = getRandInt(this.state.countryNum);
      var x2 = getRandInt(this.state.countryNum, x1);
      fetch(`/api/countries/${x1}`)
        .then(res => res.json())
        .then(country1data => this.setState({ country1: country1data[0] }));

      fetch(`/api/countries/${x2}`)
        .then(res => res.json())
        .then(country2data => this.setState({ country2: country2data[0] }));

      this.setState({ page: "game" });
      this.setState({ score: 0 });


    } else if (this.state.page === "game") { // In a game - get next country
      var newInt = getRandInt(this.state.country2.rowid);
      this.setState({ country1: this.state.country2 });

      fetch(`/api/countries/${newInt}`)
        .then(res => res.json())
        .then(country2data => this.setState({ country2: country2data[0] }));

    }
  }

  componentDidMount() {
    fetch(`/api/countryNum`)
        .then(res => res.json())
        .then(countryNum => this.setState({ countryNum: countryNum }));
  }
 
  HiLoPress = (correct) => { // Correct Press
    if (correct === 1) {
      this.setState({ score: (this.state.score + 1) }, () => {
        if (this.state.score >= this.state.highScore) this.setState({ highScore: this.state.score });
      });
      this.setCountry();
    } else {
      this.setState( {page: "end"} );
    }
  }

  setMode = (mode) => {
    this.setState( {mode: mode} );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact>
            <Home setMode={this.setMode}/>
          </Route>
          <Route path="/game" exact>
            <div className="game">
              <Game page={this.state.page} setCountry={this.setCountry} mode={this.state.mode}/>
              <h1> Country 1</h1>
              <Country country={this.state.country1} index={1} mode={this.state.mode}/>
              <br></br>
              <h1> Country 2</h1>
              <Country country={this.state.country2} index={2} mode={this.state.mode}/>
              <HiLoButton country1={this.state.country1} country2={this.state.country2} HiLoPress={this.HiLoPress} mode={this.state.mode} />
              <br></br>
              <Score score={this.state.score} highScore={this.state.highScore} />
            </div>
          </Route>
          <Route path="/end" exact>

              <End country={this.state.country2} mode={this.state.mode} score={this.state.score}></End>
              <Score score={this.state.score} highScore={this.state.highScore} />

          </Route>
        </div>
      </Router>
    );
  }
}


export default App;
