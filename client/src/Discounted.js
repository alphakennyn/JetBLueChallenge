import React, { Component } from 'react';
// import { Modal, Popover,Tooltip,Button, OverlayTrigger } from 'react-bootstrap';
import './App.css';
import {ReactBootstrapSlider} from 'react-bootstrap-slider';


export class Discounted extends Component {
  state = {currentValue: 0, step:1, min :0, max: 100};

  render() {
    return (
      <div>
        <ReactBootstrapSlider 
            value={this.state.currentValue}
            step={this.state.step}
            max={this.state.max}
            min={this.state.min}

        />
        <p>{this.state.currentValue}</p>
      </div>
    );
  }
}
