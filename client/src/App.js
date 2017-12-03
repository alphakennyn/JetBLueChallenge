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
        <header>What do you want in a vacation?</header>
        <ReactBootstrapSlider
          value={this.state.currentValue}
          change={this.changeValue}
          slideStop={this.changeValue}
          step={1}
          max={10}
          min={1}
          orientation="vertical"
          reversed={true}
          disabled="disabled" />
          <p>Hello</p>
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
        <HeadBanner id="Header">
          <h1>SimpliFly</h1>
        </HeadBanner>
        <Grid>
          
          <Row className="show-grid">  
            <Col sm={8} md={9}>
              <Sidebar />
            </Col>
            <Col sm={4} md={3}>
              <button onClick={this.handleShowMore}>Show more!</button>
              <Row className="show-grid">
                {myLocation}
              </Row>
            </Col>
          </Row>  
        </Grid>
      </div>
    );
  }
}
export default App;
