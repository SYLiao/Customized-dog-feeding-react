import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import SingleChoice from './SingleChoice';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';
import Story from './story';

class Spayed extends React.Component {

  state = {
    petName: localStorage.getItem("petName"),
    progressNumber: 1,
    show: "disable-div",
    preg: "或怀孕",
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	componentDidMount(){
    if(this.state.profile === null || this.state.profile.progressNumber < 5) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
    if(profile.q2.gender === "girl"){
      this.setState({
        show: "",
      })
    }
  }
  
  handleChange = (event) => {
    let profile = this.state.profile;
      profile.q2.spay = event.target.value;
      this.setState({
        profile: profile,
    });
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page2/breed");
  }

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2}></ProgressBar>
            <div class="container">
              <div class="row align-items-center">
                <div class="pz-slide pz-slide--107">
                  <div class="pz-slide__content col-lg-6">
                    <div class="pz-slide__content-header">
                      <div class="pz-content-header text-left">
                        <div class="content-header__eyebrow-container">
                          <div class="content-header__eyebrow text-rust">Gender</div></div>
                        <div class="content-header__title">
                          <h1>{this.state.petName + "绝育" + this.state.preg + "了吗?"}</h1>
                        </div>
                      </div>
                    </div>
                    <div class="pz-form__form-group form-group">
                    <SingleChoice choices={["绝育了", "没绝育", "怀孕"]} ></SingleChoice>

                      {/* <div className="line"></div>
                      <div class="input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                          <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" value="spayed" onClick={this.handleChange}/>
                          <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">绝育了</label>
                      </div>
                      <div class="input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                          <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" value="notSpayed" onClick={this.handleChange}/>
                          <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">没绝育</label>
                      </div>
                      <div class={"input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg " + this.state.show}>
                          <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" value="pregnancy" onClick={this.handleChange}/>
                          <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">怀孕</label>
                      </div> */}
                    </div>
                  </div>
                <Story profile={this.state.profile} progress={1}></Story>
                </div>
              </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
          </div>
        )
    }
}
const spayed = withRouter(Spayed);
export default spayed;