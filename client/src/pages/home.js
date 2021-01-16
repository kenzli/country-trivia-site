import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
      <h1>Home yea home</h1>
      <Link to="/game">Play</Link>
    </div>
  );
}

export default Home;