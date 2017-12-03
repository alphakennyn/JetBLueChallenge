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
    this.changeWeatherValue = this.changeWeatherValue.bind(this);
    this.changePriceValue = this.changePriceValue.bind(this);
    this.changeDesireValue = this.changeDesireValue.bind(this);      
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

  changeWeatherValue(event) {
      this.setState({weatherValue: event.target.value});      
  }
  changePriceValue(event) {
      this.setState({priceValue: event.target.value});      
  }
  changeDesireValue(event) {
      this.setState({desireValue: event.target.value});      
  }  

  render() {
    return (
      <div id="sidebar">
       <h1>SimpliFly</h1>
       <h3>What do you want in a vacation?</h3>

       <h4>Weather</h4>
       <ReactBootstrapSlider
        value={this.state.weatherValue}
        change={this.changeWeatherValue}
        step={1}
        max={10}
        min={0}
        />

       <h4>Low Cost</h4>
       <ReactBootstrapSlider
        value={this.state.priceValue}
        change={this.changePriceValue}
        step={1}
        max={10}
        min={0}
        />    

       <h4>Popularity</h4>
       <ReactBootstrapSlider
        value={this.state.desireValue}
        change={this.changeDesireValue}
        step={1}
        max={10}
        min={0}
        />                
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
                          <Col sm={6} md={6}>
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
