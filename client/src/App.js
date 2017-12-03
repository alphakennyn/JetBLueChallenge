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
       <h1>SimpliFly</h1>
       <h3>What do you want in a vacation?</h3>
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
  findProp(obj, prop, defval){
    if (typeof defval == 'undefined') defval = null;
    prop = prop.split('.');
    for (var i = 0; i < prop.length; i++) {
        if(typeof obj[prop[i]] == 'undefined')
            return defval;
        obj = obj[prop[i]];
    }
    return obj;
}

  render() {
    return (
      <div className="thumbnail">
        <img className="locationIcon" alt={this.props.Code} src={"/src/airport_pics/"+this.props.Code+".png"}/>
        <p>{this.props.Code}</p>
        <p>{this.state.info.city}, {this.state.info.state}</p>
        <p>{this.findProp(this.state.info, 'weather.temp')}</p>
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
            <Row className="show-grid">
            {this.state.start.map(startObj =>
              <Col className="no-space" xs={8} sm={6} md={3}>
                <Location 
                  Code={startObj.DestinationAirportCode} 
                  location={startObj.DestinationAirportCode}
                />
              </Col>
            )}
            </Row>
          </Grid>
      </div>
    );
  }
}
export default App;
