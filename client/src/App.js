import React from 'react';
import Country from './components/Country.js';
import Score from './components/Score.js';
import HiLoButton from './components/HiLoButton.js';
import Home from './components/Home.js';
import Game from './components/Game.js';
import End from './components/End.js';
import './App.css';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component {
  state = {
    page: "home",
    country1: {
      name: "",
      population: "",
      size: ""
    },
    country2: {
      name: "",
      population: "",
      size: ""
    },
    score: 0,
    highScore: 0,
    mode: "population"
  }

  //index, dbId, name, population, size
  setCountry = async () => {
    if (this.state.page === "home" || this.state.page === "end") { // New game
      const res1 = await fetch(`/api/randcountry`);
      const jsonRes1 = await res1.json();
      this.setState({ country1: {
        name: jsonRes1[0].name,
        population: jsonRes1[0].population,
        area: jsonRes1[0].area,
      }});

      do {
        const res2 = await fetch(`/api/randcountry`);
        const jsonRes2 = await res2.json();
        this.setState({ country2: {
          name: jsonRes2[0].name,
          population: jsonRes2[0].population,
          area: jsonRes2[0].area,
        }});
      } while (this.state.country1.name === this.state.country2.name)

      this.setState({ page: "game" });
      this.setState({ score: 0 });

    } else if (this.state.page === "game") { // In a game - get next country
      this.setState({ country1: this.state.country2 });

      do {
        const res2 = await fetch(`/api/randcountry`);
        const jsonRes2 = await res2.json();
        this.setState({ country2: jsonRes2[0] });
      } while (this.state.country1.name === this.state.country2.name)

    }
  }

  componentDidMount() {}
 
  HiLoPress = (correct) => { // Correct Press
    if (correct === 1) {
      this.setState({ score: (this.state.score + 1) }, () => {
        if (this.state.score >= this.state.highScore) this.setState({ highScore: this.state.score });
      });
      this.setCountry();
    } else {
      this.endGame();
    }
  }

  endGame = () => {
    this.setState( {page: "end"} );
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
              <Game page={this.state.page} setCountry={this.setCountry} endGame = {this.endGame} mode={this.state.mode}/>
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
              <End country={this.state.country2} mode={this.state.mode} score={this.state.score} highScore={this.state.highScore}></End>
          </Route>
        </div>
      </Router>
    );
  }
}


export default App;
