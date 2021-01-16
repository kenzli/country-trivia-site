import React from 'react';
import { Link } from 'react-router-dom';

class HiLoButton extends React.Component {
  
  render() {
    let higherButton;
    let lowerButton;
    if (this.props.country2["population"] >= this.props.country1["population"]) {
      higherButton = <button onClick={this.props.HiLoPress.bind(this, 1)}>Higher</button>
      lowerButton = <Link to="/end" onClick={this.props.HiLoPress.bind(this, 0)}><button>Lower</button></Link>
    } else {
      higherButton = <Link to="/end" onClick={this.props.HiLoPress.bind(this, 0)}><button>Higher</button></Link>
      lowerButton = <button onClick={this.props.HiLoPress.bind(this, 1)}>Lower</button>
    }
    return (
      <div className='hilobuttons'>
        {higherButton}
        {lowerButton}
      </div>
    );
  }
}

export default HiLoButton;