import React from 'react';
import { Link } from 'react-router-dom';


class Game extends React.Component {

  componentDidMount() {
    this.props.setCountry();
  }
  
  render() {
    return (
      <div className='game-header'>
        <h1>Country Guesser</h1>
        <p>You are currently in a {this.props.mode} game</p>
        <Link to="/end" className="end-button" onClick={this.props.endGame.bind()} >End Game</Link>
      </div>
    );
  }
}

export default Game;