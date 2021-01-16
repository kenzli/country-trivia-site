import React from 'react';
import { Link } from 'react-router-dom';

function rounded(x) {
  return (Number(Number.parseFloat(x).toPrecision(3))).toLocaleString('en');
}

class End extends React.Component {
  

  render() {
    let endText;
    let scoreText;
    if (this.props.mode === "population") {
      endText = <p>{this.props.country["name"]} has a population of {rounded(this.props.country["population"])}</p>;
    } else if (this.props.mode === "size") {
      endText = <p>{this.props.country["name"]} has an area of {rounded(this.props.country["size"])} km^2</p>;
    }

    if (this.props.score === 1) scoreText = <p>You guessed {this.props.score} country correctly</p>
    else scoreText = <p>You guessed {this.props.score} countries correctly</p>
    return (
      <div className='end'>
        <h1>Game over</h1>
        {endText}
        {scoreText}
        <br></br>
        <Link to="/" className="home-button">Go Home</Link>
        <br></br>
        <Link to="/game" className="play-again">Play Again</Link>
      </div>
    );
  }
}
/*
function End(props) {
  return (
    <div className='end'>
      <h1>Game over</h1>
      <p>{this.props.country["name"]} has a population of {props.country["population"]}</p>
      <br></br>
      <Link to="/"><button>Go Home</button></Link>
      <br></br>
      <Link to="/game"><button>Play Again</button></Link>
    </div>
  );
}
*/
export default End;