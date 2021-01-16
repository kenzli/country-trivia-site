import React from 'react';
import { Link } from 'react-router-dom';

function rounded(x) {
  return (Number(Number.parseFloat(x).toPrecision(3))).toLocaleString('en');
}

class End extends React.Component {
  render() {
    return (
      <div className='end'>
        <h1>Game over</h1>
        <p>{this.props.country["name"]} has a population of {rounded(this.props.country["population"])}</p>
        <br></br>
        <Link to="/"><button>Go Home</button></Link>
        <br></br>
        <Link to="/game"><button>Play Again</button></Link>
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