import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';
import Story from './story';

class DogName extends React.Component {

  state = {
		name: localStorage.getItem("name"),
    dogName: "",
		progressNumber: 0,
		continue: false,
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	componentDidMount(){
    if(this.state.profile === null || this.state.profile.progressNumber < 2) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
		profile.progressNumber = 2;
    this.setState({
      dogName: profile.q2.name,
      profile: profile,
    })
    localStorage.setItem("profile", JSON.stringify(profile));
  }
  
  handleChange = (event) => {
    let profile = this.state.profile;
		profile.q2.name = event.target.value;
		this.setState({
				[event.target.name]: event.target.value,
        profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    localStorage.setItem("petName", this.state.dogName);
    this.props.history.push("/customer/page2/gender");
  }

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2}></ProgressBar>
            <div class="container">
              <div class="pz-slide__content-mid col-lg-6">
              <div class="pz-slide__content-header">
                <div class="pz-content-header text-center">
                  <div class="content-header__custom">
                    <h3>Your pup deserves better nutrition!</h3>
                    <p>Create their unique wellness plan by answering a few questions. This should only take about 3 minutes!</p>
                  </div>
                  <div class="content-header__title">
                    <h1>What's your&nbsp;dog's name?</h1></div>
                  <div class="content-header__subtitle content-header__subtitle--tight">Don’t worry, you can add another dog at the end of this quiz.</div></div>
              </div>
              <div class="pz-slide__form">
                <div class="pz-form alternate-form container-fluid">
                  <div class="pz-form__form-group form-group">
                    <div class="pz-form__form-group form-group">
                      <input id="quiz-input-1" type="text" required="" class="pz-control pz-control__input form-control is-invalid" aria-label="Dog name" placeholder="Dog name" maxlength="10" 
                      name="dogName" value={this.state.dogName} onChange={this.handleChange}/>
                      <p class="pz-control__input-limit">0/10</p>
                      <div class="invalid-feedback text-left">This field is required</div></div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
          </div>
        )
    }
}
const dogName = withRouter(DogName);
export default dogName;