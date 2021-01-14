//import './countries.css';
import React from 'react';

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "ken",
      countries: []
    };
  }

  componentDidMount() {
    fetch('/api/test')
      .then(res => res.json())
      .then(testdata => this.setState({name: testdata["text"]}, () => console.log('Fetch 1 Successful', testdata)));

    fetch('/api/countries')
      .then(res => res.json())
      .then(countrydata => this.setState({countries: countrydata}, () => console.log('Fetch 2 Successful', countrydata)));
  }


  render() {
    console.log("hello?");
    console.log(this.state.countries);
    return (
      <div>
        <h2> First small class Test</h2>
        <p>{this.state.name}</p>
        {this.state.countries.map(obj => {
          return <p key={obj["id"]}> {obj["info"]} </p>;
        })}
      </div>
    );
  }
}

export default Countries;
