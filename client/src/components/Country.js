//import './countries.css';
import React from 'react';

function rounded(x) {
  return (Number(Number.parseFloat(x).toPrecision(3))).toLocaleString('en');
}

class Country extends React.Component {

  render() {
    let textDisplay;
    if (this.props.mode === "pop") {
      if (this.props.index === 1) textDisplay = <p>{this.props.country["name"]}, Population of {rounded(this.props.country["population"])}</p>
      else textDisplay = <p>Does {this.props.country["name"]} have a higher or lower population?</p>
    } else if (this.props.mode === "size") {
      if (this.props.index === 1) textDisplay = <p>{this.props.country["name"]}, Size of {rounded(this.props.country["size"])} km^2</p>
      else textDisplay = <p>Does {this.props.country["name"]} have a higher or lower area?</p>
    }

    return (
      <div>
        {textDisplay}
      </div>
    );
  }
}

export default Country;
