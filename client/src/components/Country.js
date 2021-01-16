import React from 'react';

function rounded(x) {
  return (Number(Number.parseFloat(x).toPrecision(3))).toLocaleString('en');
}

class Country extends React.Component {

  render() {
    let textDisplay;
    if (this.props.mode === "population") {
      if (this.props.index === 1) textDisplay = <p><b>{this.props.country["name"]}</b>, Population of {rounded(this.props.country["population"])}</p>
      else textDisplay = <p>Does <b>{this.props.country["name"]}</b> have a higher or lower population?</p>
    } else if (this.props.mode === "size") {
      if (this.props.index === 1) textDisplay = <p><b>{this.props.country["name"]}</b>, Size of {rounded(this.props.country["size"])} km^2</p>
      else textDisplay = <p>Does <b>{this.props.country["name"]}</b> have a higher or lower area?</p>
    }

    return (
      <div className="Country">
        {textDisplay}
      </div>
    );
  }
}

export default Country;
