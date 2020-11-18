import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import MultipleChoice from './MultipleChoice'
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';
import Story from './story';

class HealthConcerns extends React.Component {
  state = {
    dogName: localStorage.getItem("petName"),
		progressNumber: 1,
		continue: false,
    profile:JSON.parse(localStorage.getItem("profile")),
  }


  componentDidMount() {
    if(this.state.profile === null || this.state.profile.progressNumber < 9) {
      this.props.history.push("/customer/page1");
    }
  }

  render() {
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
                      <h1>Does Mookey ever experience any of the following problems? If so, he may benefit from a sensitive blend.</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
                  <MultipleChoice choices={["Frequently Chews Paws", "Loose Stool", "Hot Spots", "Vomiting", "Frequent Skin Infections", "Excessive Gas", "clearAll"]} ></MultipleChoice>
                    {/* <div class="input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                      <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" />
                      <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">我不知道</label>
                    </div> */}
                  </div>
                </div>
              </div>
              <Story profile={this.state.profile} progress={4}></Story>
            </div>
          </div>
        </div>
        <div class="footer--quiz"><button class="btn btn-solid" disabled="">下一步</button></div>
      </div>
    )
  }
}
const healthConcerns = withRouter(HealthConcerns);
export default healthConcerns;