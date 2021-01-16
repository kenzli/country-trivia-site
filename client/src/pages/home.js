import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <h1>Home yea home</h1>
        <Link to="/game" onClick={this.props.setMode.bind(this, "pop")}>Play with population</Link>
        <br></br>
        <Link to="/game" onClick={this.props.setMode.bind(this, "size")}>Play with area</Link>
      </div>
    );
  }
}

export default Home;