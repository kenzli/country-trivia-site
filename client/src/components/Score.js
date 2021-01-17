import React from 'react';

class Score extends React.Component {

  render() {
    return (
      <div className="scores">  
        <p>High Score: {this.props.highScore}</p>
        <p>Score: {this.props.score}</p>
      </div>
    );
  }
}

export default Score;
