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

class Gender extends React.Component {

  state = {
    petName: localStorage.getItem("petName"),
    progressNumber: 1,
    show1: "",
    show2: "",
		continue: false,
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	componentDidMount(){
    if(this.state.profile === null || this.state.profile.progressNumber < 3) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
    if(profile.q2.gender === "boy") {
      this.setState({
        show1: "selected",
        show2: "",
		  });
    }
    else if(profile.q2.gender === "girl") {
      this.setState({
        show2: "selected",
        show1: "",
		  });
    }
  }
  
  handleChange = (event) => {
    console.log(event.currentTarget.id);
    let profile = this.state.profile;
    if(event.currentTarget.id === "boy"){
      profile.q2.gender = "boy";
      this.setState({
        show1: "selected",
        show2: "",
        profile: profile,
		});
    }
		else{
      profile.q2.gender = "girl";
      this.setState({
        show1: "",
        show2: "selected",
        profile: profile,
		});
    }
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page2/birthday");
  }

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2} ></ProgressBar>
            <div class="container">
              <div class="row align-items-center">
                <div class="pz-slide pz-slide--107">
                  <div class="pz-slide__content col-lg-6">
                    <div class="pz-slide__content-header">
                      <div class="pz-content-header text-left">
                        <div class="content-header__eyebrow-container">
                          <div class="content-header__eyebrow text-rust">Gender</div></div>
                        <div class="content-header__title">
                          <h1>Mookey是男孩还是女孩?</h1>
                        </div>
                      </div>
                    </div>
                      <div class="options options--images genders__options">
                        <div class={"option option--image " + this.state.show1} id="boy" onClick={this.handleChange}>
                          <img src="/static/media/boy.65fc14b6.jpg" width="100%" alt="" />
                          <div class="option__text">
                            <div class="option__text__label with-margin">Boy</div></div>
                        </div>
                        <div class={"option option--image " + this.state.show2} id="girl" onClick={this.handleChange}>
                          <img src="/static/media/girl.fbaf4093.jpg" width="100%" alt="" />
                          <div class="option__text">
                            <div class="option__text__label with-margin">Girl</div></div>
                        </div>
                    </div>
                  </div>
                {/* <Story></Story> */}
                </div>
              </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
          </div>
        )
    }
}
const gender = withRouter(Gender);
export default gender;