import React from 'react';
import { Link } from 'react-router-dom';


class Game extends React.Component {
  /*
  setCountry = () => {
    if (this.props.page == "home") {
      var x1 = getRandInt();
      var x2 = getRandInt(x1);
      fetch(`/api/countries/${x1}`)
        .then(res => res.json())
        .then(countrydata => this.setState({ countries: countrydata }, () => console.log('Fetch 2 Successful', countrydata)));
  
    }
    this.props.setCountry();
  }
  */
  componentDidMount() {
    this.props.setCountry();
  }
  
  render() {
    return (
      <div className='game'>
        <h1>Game</h1>
        <p>You are in game</p>
        <Link to="/end">End</Link>
      </div>
    );
  }
}

export default Game;