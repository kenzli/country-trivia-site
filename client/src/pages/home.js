import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-content'>
        <h1>Country Guesser</h1>
        <p>A higher or lower game using the countries of the world.</p>
        <Link to="/game" className='play-button' onClick={this.props.setMode.bind(this, "population")}>Play with population</Link>
        <br></br>
        <Link to="/game" className='play-button' onClick={this.props.setMode.bind(this, "size")}>Play with area</Link>
        </div>
      </div>
    );
  }
}

export default Home;