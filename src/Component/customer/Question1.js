import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';

class Question1 extends React.Component {
	state = {
		name: localStorage.getItem("name"),
		email: "",
		progressNumber: 0,
		continue: false,
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	handleNameChange = (event) => {
		let profile = this.state.profile;
		if(event.target.name === "name"){
			profile.q1.name = event.target.value;
			localStorage.setItem("name", event.target.value);
		}
		else{
			profile.q1.email = event.target.value;
		}
		this.setState({
				[event.target.name]: event.target.value,
        profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(this.state.profile));
		console.log(this.state.profile);
	}
		
	// handleSubmit = (event) => {
	// 		event.preventDefault();
	// 		// let page = this.state.progressNumber + 1;
	// 		// this.props.history.push('/question' + page);
	// 		let profile = this.state.profile;
	// 		profile.q1.name = this.state.name;
	// 		profile.q1.email = this.state.email;
	// 		this.setState({
	// 			profile: profile,
	// 			continue: true,
	// 		})

	// 	}

	componentDidMount(){
		if(this.state.profile == null){
			let newProfile = {
				progressNumber: 2,
				q1:{
					name:"",
					email: "",
				},
				q2:{
					name:"",
					gender:"",
					age:"",
					spay: false,
					breed1:"",
					breed2:"",
					bodyType:0,
					weight:0,
					activeLevel:"",
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
		let formWrap = document.getElementById( 'fs-form-wrap' );
		new FForm( formWrap, {
			onReview : function() {
				classie.add( document.body, 'overview' ); // for demo purposes only
			},
			skipReview : () => {
				console.log(this);
				this.setState({
					continue: true,
				});
			}
		}, Modernizr(window, window.document));
	}

    render(){
			if(this.state.continue){
				return(
					<Redirect to="/question2"></Redirect>
				)
			}
        return(
					<div className="test">
					<Header progressNumber={0}></Header>
					<div class="fs-form-wrap" id="fs-form-wrap">
						<div className="fs-float-left">
							<form id="myform" class="fs-form fs-form-full" autocomplete="off">
								<ol class="fs-fields">
									<li>
										{/* <div class="fs-anim-upper title" >Tell us about yourself</div> */}
										<label class="fs-field-label fs-anim-upper" for="q1">What's your first name?</label>
										<input class="fs-anim-lower" id="q1" name="name" type="text" placeholder="您的名字" 
										value={this.state.name} onChange={this.handleNameChange} required/>
									</li>
									<li>
										<label class="fs-field-label fs-anim-upper" for="q2">What's your email?</label>
										<input class="fs-anim-lower" id="q2" name="email" type="text" placeholder="您的邮箱" 
										value={this.state.email} onChange={this.handleNameChange} required/>
										<div class="fs-anim-lower note" >We ask for your email in case you want to save your progress and come back later.</div>
									</li>
								</ol>
								<button class="fs-submit" type="submit" onClick={this.handleSubmit}>Continue</button>
							</form>
						</div>
					</div>
						<div className="fs-float-right">
							{/* <Card title="Card title" bordered={false}>
								Card content
							</Card> */}
						</div>
					</div>
        );
    }
}
const question1 = withRouter(Question1);
export default question1;