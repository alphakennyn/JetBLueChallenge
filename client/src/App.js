import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {ReactBootstrapSlider} from 'react-bootstrap-slider';
import './App.css';

import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';


// import { MyModal } from './Discounted.js'

// import { googleLib } from './google.js'

class HeadBanner extends React.Component {
  render() {
    return (
      <div>
        <img alt="bannerpic" src={require("./images/simplyFly_banner.png")} />
      </div>
    );
  }  
}
class Sidebar extends React.Component {

  constructor() {
    super();
    this.state = {
      weatherValue: 5,
      priceValue: 5,
      desireValue: 5,
      mySentiment: {}
    }
  }

  componentWillMount() {
    fetch('/googleML')
    .then(
      res => res.json()
    ).then(
      data => this.setState({mySentiment: data})
    ).catch(function(err) {
      console.log(err)
    });
  }

  changeValue(event) {
      this.setState({weatherValue: event.target.value});      
  }

  render() {
    return (
      <div id="sidebar">
       <h1>SimpliFly</h1>
       <h3>What do you want in a vacation?</h3>
       <ReactBootstrapSlider
        value={this.state.weatherValue}
        change={this.changeValue}
        step={1}
        max={10}
        min={0}
        />
        <p>{this.state.weatherValue}</p>
          <p>{this.state.mySentiment.score}</p>
      </div>
    );
  }
}
  

class Location extends Component {

  // propTypes: {
  //   location: PropTypes.string,
  //   Code: PropTypes.string
  // }

  constructor(props) {
    super(props);
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
        <img className="locationIcon" alt={this.props.Code} src={require("./images/airport_pics/"+ this.props.Code +".png")} />
        <p>{this.props.Code}</p>
        <p>{this.state.info.city}, {this.state.info.state}</p>
        <p>{this.findProp(this.state.info, 'weather.temp')}</p>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.handleShowMore = this.handleShowMore.bind(this);
    this.state = {
      start: [],
      showItems: 4
    }
  }

  componentDidMount() {
    fetch('/trips').then(res => res.json())
    .then(start => this.setState({ start }));
  }

  handleShowMore(){
    this.setState({
      showItems:
        this.state.showItems >= this.state.start.length ?
          this.state.showItems : this.state.showItems + 2
    })
  }

  render() {
    const myLocation = this.state.start.slice(0, this.state.showItems).map(startObj =>
                          <Col className="no-space" xs={6} sm={6} md={6}>
                            <Location location={startObj.DestinationAirportCode} Code={startObj.DestinationAirportCode} />
                          </Col>
                        )

    return (
      <div className="App">
        <Sidebar />
        <Grid>              
              <Row className="show-grid">
                {myLocation}
                <button className="btn btn-primary" onClick={this.handleShowMore}>Show more!</button>
              </Row>
        </Grid>
      </div>
    );
  }
}
export default App;
