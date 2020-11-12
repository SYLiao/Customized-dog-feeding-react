import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';

class Question2 extends React.Component {
	state = {
		continue: false,
		return: false,
		profile:JSON.parse(localStorage.getItem("profile")),
		name: localStorage.getItem("name"),
		petName: localStorage.getItem("petName"),
		breeds: [],
		gender: "",
		spay: false,
		age: 0,
		birthYear:0,
		birthMonth:12,
		breed1: 0,
		bodyType: 0,
		weight: 0,
		activeLevel: 0,
		progressNumber: 1,
	}

	getBreeds = () => {
        axios.get("http://localhost:8081/mer/customer/get/all_breed")
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    breeds: resJson.data.data
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

	handleNameChange = (event) => {
		let profile = this.state.profile;
		profile.q2[event.target.name] = event.target.value;
		this.setState({
			[event.target.name]: event.target.value,
			profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(profile));
	}

	handlePetName = (event) => {
		localStorage.setItem("petName", event.target.value)
		let profile = this.state.profile;
		profile.q2.name = event.target.value;
		this.setState({
			petName: event.target.value,
			profile: profile,
		});
		localStorage.setItem("profile", JSON.stringify(profile));
	}

	handleMonth = (event) => {
		this.setState({
			birthMonth: event.target.value,
		})
		if(this.state.birthYear !== 0){
			let date = new Date();
			let year = date.getFullYear() - this.state.birthYear;
			let month = date.getMonth() - event.target.value;
			if(month < 0){
				year -= 1;
				month = 11 + month;
			}
			let age = year + "year" + month + "month";
			let profile = this.state.profile;
			profile.q2.age = age;
			localStorage.setItem("profile", JSON.stringify(profile));
			this.setState({
				profile: profile,
			})
		}
	}

	handleYear = (event) => {
		this.setState({
			birthYear: event.target.value,
		})
		if(this.state.birthMonth !== 12){
			let date = new Date();
			let year = date.getFullYear() - event.target.value;
			let month = date.getMonth() - this.state.birthMonth;
			if(month < 0){
				year -= 1;
				month = 11 + month;
			}
			let age = year + "year" + month + "month";
			let profile = this.state.profile;
			profile.q2.age = age;
			localStorage.setItem("profile", JSON.stringify(profile));
			this.setState({
				profile: profile,
			})
		}
	}
		
	  handleSubmit = (event) => {
			event.preventDefault();
			let page = this.state.progressNumber + 1;
			this.props.history.push('/question' + page);
		}

	componentDidMount(){
		if(this.state.profile === null || this.state.name === "" || this.state.name === null){
			this.setState({
				return: true,
			});
			localStorage.removeItem("name");
			localStorage.removeItem("petName");
			localStorage.removeItem("profile");
		}
		let formWrap = document.getElementById( 'fs-form-wrap' );
		[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
			new SelectFx( el, {
				stickyPlaceholder: false,
				onChange: function(val){
					document.querySelector('span.cs-placeholder').style.backgroundColor = val;
				}
			});
		} );
		new FForm( formWrap, {
			onReview : function() {
				classie.add( document.body, 'overview' ); // for demo purposes only
			}
		}, Modernizr(window, window.document));
	}

    render(){
			if(this.state.return){
				return(
					<Redirect to="/question1"></Redirect>
				);
			}
        return(
			<div>
			<Header progressNumber={1}></Header>
			<div class="fs-form-wrap" id="fs-form-wrap">
				<form id="myform" class="fs-form fs-form-full" autocomplete="off">
					<ol class="fs-fields">
						<li>
							<label class="fs-field-label fs-anim-upper" for="q1">What is your dog's name?</label>
							<input class="fs-anim-lower" id="q1" name="petName" type="text" placeholder="Your dog's name" 
							value={this.state.petName} onChange={this.handlePetName} required/>
						</li>
						<li data-input-trigger>
							{/* <div className="fs-anim-upper">Let's talk about {this.state.q1}</div> */}
							<label class="fs-field-label fs-anim-upper" for="q2" data-info="We won't send you spam, we promise...">Is {this.state.petName} a boy or a girl?</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q2b" name="gender" type="radio" value="boy" onClick={this.handleNameChange}/><label for="q2b" class="radio-boy">boy</label></span>
								<span><input id="q2a" name="gender" type="radio" value="girl" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">girl</label></span>
							</div>
						</li>
						<li data-input-trigger>
							<label class="fs-field-label fs-anim-upper" for="q3">{this.state.petName}绝育了吗？</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q3b" name="spay" type="radio" value={true} onClick={this.handleNameChange}/><label for="q3b" class="radio-yes">YES</label></span>
								<span><input id="q3a" name="spay" type="radio" value={false} onClick={this.handleNameChange}/><label for="q3a" class="radio-no">NO</label></span>
							</div>
						</li>
						<li data-input-trigger>
							<label class="fs-field-label fs-anim-upper" data-info="We'll make sure to use it all over">What breed is {this.state.petName}?</label>
							<select class="cs-select cs-skin-boxes fs-anim-lower" value={this.state.breed1} name="breed1" onChange={this.handleNameChange}>
								<option value="" disabled selected>Pick a breed</option>
								<option value="#588c75" data-class="color-588c75">#588c75</option>
								<option value="#b0c47f" data-class="color-b0c47f">#b0c47f</option>
								<option value="#f3e395" data-class="color-f3e395">#f3e395</option>
								<option value="#f3ae73" data-class="color-f3ae73">#f3ae73</option>
								<option value="#da645a" data-class="color-da645a">#da645a</option>
								<option value="#79a38f" data-class="color-79a38f">#79a38f</option>
								<option value="#c1d099" data-class="color-c1d099">#c1d099</option>
								<option value="#f5eaaa" data-class="color-f5eaaa">#f5eaaa</option>
								<option value="#f5be8f" data-class="color-f5be8f">#f5be8f</option>
								<option value="#e1837b" data-class="color-e1837b">#e1837b</option>
								<option value="#9bbaab" data-class="color-9bbaab">#9bbaab</option>
								<option value="#d1dcb2" data-class="color-d1dcb2">#d1dcb2</option>
								<option value="#f9eec0" data-class="color-f9eec0">#f9eec0</option>
								<option value="#f7cda9" data-class="color-f7cda9">#f7cda9</option>
								<option value="#e8a19b" data-class="color-e8a19b">#e8a19b</option>
								<option value="#bdd1c8" data-class="color-bdd1c8">#bdd1c8</option>
								<option value="#e1e7cd" data-class="color-e1e7cd">#e1e7cd</option>
								<option value="#faf4d4" data-class="color-faf4d4">#faf4d4</option>
								<option value="#fbdfc9" data-class="color-fbdfc9">#fbdfc9</option>
								<option value="#f1c1bd" data-class="color-f1c1bd">#f1c1bd</option>
							</select>
						</li>
						<li>
							<label class="fs-field-label fs-anim-upper" for="q5">When is {this.state.petName}'s birthday?</label>
							<div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
							<span>
							<select class="fs-select" id="q5" name="birthMonth" onChange={this.handleMonth}>
								<option value="0" >January</option>
								<option value="1" >Feburary</option>
								<option value="2" >March</option>
								<option value="3" >April</option>
								<option value="4" >May</option>
							</select>
							</span>
							<span>
							<select class="fs-select" id="q5" name="birthYear" onChange={this.handleYear}>
								<option value="2020" >2020</option>
								<option value="2019" >2019</option>
								<option value="2018" >2018</option>
								<option value="2017" >2017</option>
								<option value="2016" >2016</option>
							</select>
							</span>
							</div>
						</li>
						<li data-input-trigger>
							{/* <div className="fs-anim-upper">Let's talk about {this.state.q1}</div> */}
							<label class="fs-field-label fs-anim-upper" for="q2" data-info="We won't send you spam, we promise...">How would you describe {this.state.petName}'s body type?</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q2e" name="bodyType" type="radio" value="0" onClick={this.handleNameChange}/><label for="q2b" class="radio-boy">Emaciated lean (-> 40%)</label></span>
								<span><input id="q2d" name="bodyType" type="radio" value="1" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Thin (-10-40%)</label></span>
								<span><input id="q2c" name="bodyType" type="radio" value="2" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Ideal Body Condition</label></span>
								<span><input id="q2b" name="bodyType" type="radio" value="3" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Overweight (15-45%)</label></span>
								<span><input id="q2a" name="bodyType" type="radio" value="4" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Grossly obesity (>45%)</label></span>
							</div>
						</li>
						<li>
							<label class="fs-field-label fs-anim-upper" for="q6">How much does {this.state.petName} weight?</label>
							<input class="fs-mark fs-anim-lower" id="q5" name="weight" type="number" placeholder="1000" step="100" min="100" onChange={this.handleNameChange}/>
						</li>
						<li data-input-trigger>
							{/* <div className="fs-anim-upper">Let's talk about {this.state.q1}</div> */}
							<label class="fs-field-label fs-anim-upper" for="q2" data-info="We won't send you spam, we promise...">What's {this.state.petName}'s lifestyle like?</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q2d" name="activeLevel" type="radio" value="0" onClick={this.handleNameChange}/><label for="q2b" class="radio-boy">Inactive/Lethargic</label></span>
								<span><input id="q2c" name="activeLevel" type="radio" value="1" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Moderate Active</label></span>
								<span><input id="q2b" name="activeLevel" type="radio" value="2" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Active</label></span>
								<span><input id="q2a" name="activeLevel" type="radio" value="3" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">Sport/Working dogs</label></span>							</div>
						</li>
					</ol>
					<button class="fs-submit" type="submit" onClick={this.handleSubmit}>提交问卷</button>
				</form>
			</div>
			</div>
        );
    }
}
const question2 = withRouter(Question2);
export default Question2;