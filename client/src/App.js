import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './App.css';
// import { MyModal } from './Discounted.js'


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
        
        <Grid>
          <Row className="show-grid">
          {this.state.start.map(startObj =>
            <Col className="no-space" xs={8} sm={6} md={3}>
              <Location Code={startObj.Code} />
            </Col>
          )}
          </Row>
        </Grid>
      </div>
    );
  }
}
export default App;
