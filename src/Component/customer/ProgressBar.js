import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';

class ProgressBar extends React.Component {
  state={
    tracks: [-1.0101, 19.1919, 39.3939, 59.596, 79.798, 100],
    track: '0%',
  }

	componentDidMount(){
    let trackBar = this.props.trackBar;
    let trackNum = this.props.trackNum;
    let questions = this.props.questions;
    let track = this.state.tracks[trackBar] + (this.state.tracks[trackBar + 1] - this.state.tracks[trackBar]) / questions * trackNum;
    let trackPecentage = track + '%';
    console.log(trackPecentage);
    this.setState({
      track: trackPecentage,
    })
	}

    render(){
        return(
          <div className="">
            <div class="pz-progress-bar">
              <div class="pz-progress-bar__track">
                <div class="navigation-slider__container">
                  <span class="MuiSlider-root navigation-slider MuiSlider-colorSecondary MuiSlider-marked">
                    <span class="MuiSlider-rail navigation-slider-rail"></span>
                    <span class="MuiSlider-track navigation-slider-track" style={{left: '0%', width:this.state.track}} ></span>
                    <input type="hidden" value="33.8" />
                    <span class="MuiSlider-mark navigation-slider-mark MuiSlider-markActive navigation-slider-mark--active pos2" ></span>
                    <span aria-hidden="true" class="MuiSlider-markLabel navigation-slider-mark-label MuiSlider-markLabelActive navigation-slider-mark-label--active info" >Your Info</span>
                    <span class="MuiSlider-mark navigation-slider-mark MuiSlider-markActive navigation-slider-mark--active dog-info" ></span>
                    <span aria-hidden="true" class="MuiSlider-markLabel navigation-slider-mark-label MuiSlider-markLabelActive navigation-slider-mark-label--active dog-info" >Dog's Info</span>
                    <span class="MuiSlider-mark navigation-slider-mark sensitive" ></span>
                    <span aria-hidden="true" class="sensitive MuiSlider-markLabel navigation-slider-mark-label" >Sensitivities</span>
                    <span class="MuiSlider-mark navigation-slider-mark health" ></span>
                    <span aria-hidden="true" class="MuiSlider-markLabel navigation-slider-mark-label health" >Health &amp; Wellness</span>
                    <span class="MuiSlider-mark navigation-slider-mark food" ></span>
                    <span aria-hidden="true" class="MuiSlider-markLabel navigation-slider-mark-label food" >Current Food</span>
                    <span class="MuiSlider-mark navigation-slider-mark result" ></span>
                    <span aria-hidden="true" class="MuiSlider-markLabel navigation-slider-mark-label result" >Results</span>
                    <span class="MuiSlider-thumb navigation-slider-thumb MuiSlider-thumbColorSecondary" tabindex="0" role="slider" data-index="0" aria-orientation="horizontal" aria-valuemax="100" aria-valuemin="1" aria-valuenow="33.8" ></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
const progressBar = withRouter(ProgressBar);
export default progressBar;