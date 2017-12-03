import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {ReactBootstrapSlider} from 'react-bootstrap-slider';
import './App.css';
// import { MyModal } from './Discounted.js'

// import { googleLib } from './google.js'

class HeadBanner extends React.Component {
  render() {
    return (
      <div>
        <img src="./images/simplyFly_banner.png" />
      </div>
    );
  }  
}
class Sidebar extends React.Component {

  constructor() {
    super();
    this.state = {
      currentValue: 3,
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
        max={10}
        min={0}
        orientation="vertical"
        reversed={true}/>
          <p>{this.state.mySentiment.score}</p>
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
  constructor() {
    super();
    this.handleShowMore = this.handleShowMore.bind(this);
    this.state = {
      start: [],
      showItems: 2
    }
  }
  // state = {start: [], showItems: 10}

  componentDidMount() {
    fetch('/trips').then(res => res.json())
    .then(start => this.setState({ start }));
  }

  handleShowMore(){
    this.setState({
      showItems:
        this.state.showItems >= this.state.start.length ?
          this.state.showItems : this.state.showItems + 4
    })
  }

  render() {
    const myLocation = this.state.start.slice(0, this.state.showItems).map(startObj =>
                          <Col className="no-space" xs={8} sm={6} md={3}>
                            <Location Code={startObj.Code} location={startObj.Code} />
                          </Col>
                        )

    return (
      <div className="App">
        <Sidebar />
        <Grid>
          <button className="btn btn-primary" onClick={this.handleShowMore}>Show more!</button>
          <Row className="show-grid">
            {myLocation}
          </Row> 
        </Grid>
      </div>
    );
  }
}
export default App;
