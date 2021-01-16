import React from 'react';
import { Link } from 'react-router-dom';

class HiLoButton extends React.Component {
  
  render() {
    let higherButton;
    let lowerButton;  
    if (this.props.country2[this.props.mode] >= this.props.country1[this.props.mode]) {
      higherButton = <Link className='hilo-button' to="/game" onClick={this.props.HiLoPress.bind(this, 1)}>Higher</Link>
      lowerButton = <Link className='hilo-button' to="/end" onClick={this.props.HiLoPress.bind(this, 0)}>Lower</Link>
    } else {
      higherButton = <Link className='hilo-button' to="/end" onClick={this.props.HiLoPress.bind(this, 0)}>Higher</Link>
      lowerButton = <Link className='hilo-button' to="/game" onClick={this.props.HiLoPress.bind(this, 1)}>Lower</Link>
    }
    return (
      <div>
        {higherButton}
        {lowerButton}
      </div>
    );
  }
}

export default HiLoButton;