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

class Weight extends React.Component {

  state = {
    petName: localStorage.getItem("petName"),
    progressNumber: 1,
		continue: false,
    profile:JSON.parse(localStorage.getItem("profile")),
    weight: 0,
	}

	componentDidMount(){
    if(this.state.profile === null || this.state.profile.progressNumber < 7) {
      this.props.history.push("/customer/page1");
    }
  }
  
  handleChange = (event) => {
    let profile = this.state.profile;
      profile.q2.weight = event.target.value;
      this.setState({
        weight: event.target.value,
        profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
  }

  handleSubmit = (event) => {
    let input = document.getElementById("quiz-input-1");
    if (input.value == "") {
      input.classList.add("is-invalid");
    } else {
      let profile = this.state.profile;
      profile.progressNumber += 1;
      localStorage.setItem("profile", JSON.stringify(this.state.profile));
      this.props.history.push("/customer/page2/activeLevel");
    }
  }

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
            <div class="container">
              <div class="row align-items-center">
                <div class="pz-slide pz-slide--107">
                  <div class="pz-slide__content col-lg-6">
                    <div class="pz-slide__content-header">
                      <div class="pz-content-header text-left">
                        <div class="content-header__eyebrow-container">
                          <div class="content-header__eyebrow text-rust">Gender</div></div>
                        <div class="content-header__title">
                          <h1>{this.state.petName}的体重是?</h1>
                        </div>
                      </div>
                    </div>
                    <div style={{height:"40px"}}></div>
                    <div class="pz-form alternate-form container-fluid">
                      <div class="pz-form__form-group form-group">
                        <div class="pz-form__form-group form-group">
                          <input id="quiz-input-1" type="number" required="" class="pz-control pz-control__input form-control" aria-label="Weight in KGS" placeholder="Weight in KGS" 
                          name="weight" onChange={this.handleChange}/>
                          <div class="invalid-feedback text-left">多少斤啊到底</div></div>
                      </div>
                    </div>
                  </div>
                <Story profile={this.state.profile}></Story>
                </div>
              </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
          </div>
        )
    }
}
const weight = withRouter(Weight);
export default weight;