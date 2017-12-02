import React, { Component } from 'react';
import './App.css';

class Location extends Component {
    render() {
      return (
        <div className="thumbnail">
          <img className="locationIcon" alt={this.props.Code} src="https://image.flaticon.com/teams/slug/freepik.jpg"/>
          <p>{this.props.Code}</p>
        </div>
      );
    }
}

class App extends Component {
  state = {start: []}

  componentDidMount() {
    fetch('/trips').then(res => res.json())
    .then(start => this.setState({ start }));
  }

  render() {
    return (
      <div className="App">
        <h1>JetBlue cheapy</h1>
        <div className="leftCol">
          {this.state.start.map(startObj =>
            <Location Code={startObj.Code} />
          )}
        </div>
      </div>
    );
  }
}
export default App;
