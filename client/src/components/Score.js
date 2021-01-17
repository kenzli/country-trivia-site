import React from 'react';

class Score extends React.Component {

  render() {
    return (
      <div className="scores"> 
        <p>Score: {this.props.score}</p>
        <p>High Score: {this.props.highScore}</p>
      </div>
    );
  }
}

export default Score;
