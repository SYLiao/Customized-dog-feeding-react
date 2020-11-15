import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import SlideChoice from './slideChoice'
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';
import Story from './story';

class ActiveLevel extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
    dogName: localStorage.getItem("petName"),
		progressNumber: 1,
		continue: false,
    profile:JSON.parse(localStorage.getItem("profile")),
    choiceMap: [1,2,3,4],
    select: 0,
    levels: ["Inactive/Lethargic", "Moderate Active", "Active", "Sport dog"],
    level: 0,
  }

  componentDidMount() {
    if(this.state.profile === null || this.state.profile.progressNumber < 8) {
      this.props.history.push("/customer/page1");
    }
  }

  handleChange = (event) => {
    let profile = this.state.profile;
    profile.q2.activeLevel = this.state.levels[event.currentTarget.id];
    profile.q2.activeLevelId = event.currentTarget.id;
		this.setState({
      select: event.currentTarget.id,
        profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
}

  render() {
    let partition = 97.5 / (this.state.choiceMap.length-1);
    return (
      <div>
        <Header></Header>
        <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
        <div class="container">
          <div class="row align-items-center">
            <div class="pz-slide pz-slide--107">
              <div class="pz-slide__content col-lg-6">
                <div class="pz-slide__content-header">
                  <div class="pz-content-header text-left">
                    <div class="content-header__eyebrow-container">
                      <div class="content-header__eyebrow text-rust">AGE</div></div>
                    <div class="content-header__title-2">
                      <h1>Mookey的出生日期?</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
                  <div id="radios" class="r-radio-slider__container">
                    <div class="r-radio-slider__rail">
                      <div id={0} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${0}`}></input>
                                    <label for={`radio-slider-option-${0}`} class="r-radio-slider__label" style={{left: `2.5%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">Inactive/Lethargic</p><p class="radio-slider__subtitle">smaller than 1 h/day Walking</p>
                                    </label>
                                    <span style={{left: `2.5%`}} class="r-radio-slider__btn"></span>
                                </div>
                                <div id={1} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${1}`}></input>
                                    <label for={`radio-slider-option-${1}`} class="r-radio-slider__label" style={{left: `${partition * 1}%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">Moderate Active</p><p class="radio-slider__subtitle">1-3 h/day low impact</p>
                                    </label>
                                    <span style={{left: `${partition * 1}%`}} class="r-radio-slider__btn"></span>
                                </div>
                                <div id={2} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${2}`}></input>
                                    <label for={`radio-slider-option-${2}`} class="r-radio-slider__label" style={{left: `${partition * 2}%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">Active</p><p class="radio-slider__subtitle">1-3 h/day high impact</p>
                                    </label>
                                    <span style={{left: `${partition * 2}%`}} class="r-radio-slider__btn"></span>
                                </div>
                                <div id={3} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${3}`}></input>
                                    <label for={`radio-slider-option-${3}`} class="r-radio-slider__label" style={{left: `${partition * 3}%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">Sport dogs</p><p class="radio-slider__subtitle">3-6 h/day</p>
                                    </label>
                                    <span style={{left: `${partition * 3}%`}} class="r-radio-slider__btn"></span>
                                </div>
                                <span class="r-radio-slider__track-container" style={{width: `100%`}}>
                            <span class="r-radio-slider__track" style={{width: `${partition * this.state.select + 4}%`}}></span>
                            <span class="r-radio-slider__knob" style={{left: `${partition * this.state.select + 4}%`}}></span>
                        </span>
                    </div>
                  </div>
                  {/* <SlideChoice choiceMap={[1,2,3,4,5]} ></SlideChoice> */}
                  </div>
                </div>
              </div>
              <Story profile={this.state.profile}></Story>
            </div>
          </div>
        </div>
        <div class="footer--quiz"><button class="btn btn-solid" disabled="">下一步</button></div>
      </div>
    )
  }
}
const activeLevel = withRouter(ActiveLevel);
export default activeLevel;