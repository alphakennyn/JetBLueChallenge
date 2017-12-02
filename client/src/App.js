import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import './App.css';
// import { MyModal } from './Discounted.js'

class Sidebar extends React.Component {

  constructor() {
    super();
    this.state = {
      currentValue: 3,
    }
  }

  render() {
    return (
      <div id="sidebar">
       <header>What do you want in a vacation?</header>
       <ReactBootstrapSlider
        value={this.state.currentValue}
        change={this.changeValue}
        slideStop={this.changeValue}
        step={1}
        max={7}
        min={1}
        orientation="vertical"
        reversed={true}
        disabled="disabled" />
      </div>
    );
  }
}
  

class Location extends Component {

  propTypes: {
    location: PropTypes.string
  }

  constructor() {
    super();
    this.state = {info: {}};
  }

  componentWillMount() {
    fetch('http://services.faa.gov/airport/status/' + this.props.location + '?format=application/json')
    .then(
      res => res.json()
    ).then(
      data => this.setState({info: data})
    ).catch(function(err) {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="thumbnail">
        <img className="locationIcon" alt={this.props.Code} src="https://image.flaticon.com/teams/slug/freepik.jpg"/>
        <p>{this.props.Code}</p>
        <p>{this.state.info.city}, {this.state.info.state}</p>
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
        <Sidebar />
          <Grid>
          <h1>JetBlue cheapy</h1>
            <Row className="show-grid">
            {this.state.start.map(startObj =>
              <Col className="no-space" xs={8} sm={6} md={3}>
                <Location Code={startObj.Code} location={startObj.Code} />
              </Col>
            )}
            </Row>
          </Grid>
      </div>
    );
  }
}
export default App;
