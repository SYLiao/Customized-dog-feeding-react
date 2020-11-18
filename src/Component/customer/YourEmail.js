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

class YourEmail extends React.Component {
  state = {
		name: localStorage.getItem("name"),
    email: "",
		progressNumber: 0,
		continue: false,
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	componentDidMount(){
    if(this.state.profile == null){
			let newProfile = {
        progressNumber: 1,
				q1:{
					name:"",
					email: "",
				},
				q2:{
					name:"",
					gender:"",
					age:"",
					spay: "",
					breed1:"",
					breed2:"",
					bodyType:0,
					weight:0,
					activeLevel:"",
					activeLevelId:0,
				},
				q3:{
					FrequentlyChewsPaws: false,
					LooseStool: false,
					HotSpots: false,
					Vomiting: false,
					FrequentSkinInfections: false,
					ExcessiveGas: false,
					Grains: false,
					Eggs: false,
					Chicken: false,
					Gluten: false,
					RedMeat: false,
					Flax: false,
					Potatoes: false,
					None: false,
				},
				q4:{
					choose:0,
					costomize:{

					},
					recommand:{

					},
				},
      };
      this.setState({
				profile : newProfile
			});
			localStorage.setItem("profile", JSON.stringify(newProfile));
    }
  }

  handleChange = (event) => {
    console.log(event);
    let profile = this.state.profile;
		profile.q1.email = event.target.value;
		this.setState({
				[event.target.name]: event.target.value,
        profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
		console.log(this.state.profile);
  }

  handleSubmit = (event) => {
	let input = document.getElementById("quiz-input-1");
	if (input.value == "") {
		input.classList.add("is-invalid");
	} else {
		let profile = this.state.profile;
		profile.progressNumber += 1;
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
		this.props.history.push("/customer/page2/dog");
	}
  }

    render() {
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
            <div class="container">
              <div class="pz-slide__content-mid col-lg-6">
              <div class="pz-slide__content-header">
                <div class="pz-content-header text-center">
                  <div class="content-header__title">
                    <h1>您的邮箱？</h1></div>
                  <div class="content-header__subtitle content-header__subtitle--tight">我们将用您的邮箱记录您的进度。</div></div>
              </div>
              <div class="pz-slide__form">
                <div class="pz-form alternate-form container-fluid">
                  <div class="pz-form__form-group form-group">
                    <div class="pz-form__form-group form-group">
                      <input id="quiz-input-1" type="email" required="" class="pz-control pz-control__input form-control" aria-label="Dog name" placeholder="您的邮箱" maxlength="30" 
                      name="email" value={this.state.email} onChange={this.handleChange}/>
                      {/* <p class="pz-control__input-limit">0/10</p> */}
                      <div class="invalid-feedback text-left">请补全你的邮箱</div></div>
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
const yourEmail = withRouter(YourEmail);
export default yourEmail;