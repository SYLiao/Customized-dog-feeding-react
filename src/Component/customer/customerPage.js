import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';

class CustomerPage extends React.Component {
	state = {
		q1: "",
		q2: "",
		q3: "",
		q4: "",
		petReducer:{
			You:{},
			YourDog:{
				name: "",
				gender: "",
			}
		},
		breeds: [],
		progressNumber: 2,
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
		this.setState({
            [event.target.name]: event.target.value,
		});
    }

	componentDidMount(){
		// this.getBreeds();
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
        return(
			<div>
			<Header progressNumber={this.state.progressNumber}></Header>
			<div class="fs-form-wrap" id="fs-form-wrap">
				<form id="myform" class="fs-form fs-form-full" autocomplete="off">
					<ol class="fs-fields">
						<li>
							<label class="fs-field-label fs-anim-upper" for="q1">What is your dog's name?</label>
							<input class="fs-anim-lower" id="q1" name="q1" type="text" placeholder="Your dog's name" 
							value={this.state.q1} onChange={this.handleNameChange} required/>
						</li>
						<li data-input-trigger>
							{/* <div className="fs-anim-upper">Let's talk about {this.state.q1}</div> */}
							<label class="fs-field-label fs-anim-upper" for="q2" data-info="We won't send you spam, we promise...">Is {this.state.q1} a boy or a girl?</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q2b" name="q2" type="radio" value="boy" onClick={this.handleNameChange}/><label for="q2b" class="radio-boy">boy</label></span>
								<span><input id="q2a" name="q2" type="radio" value="girl" onClick={this.handleNameChange}/><label for="q2a" class="radio-girl">girl</label></span>
							</div>
						</li>
						<li data-input-trigger>
							<label class="fs-field-label fs-anim-upper" for="q3">{this.state.q1}绝育了吗？</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
								<span><input id="q3b" name="q3" type="radio" value="yes" onClick={this.handleNameChange}/><label for="q3b" class="radio-yes">YES</label></span>
								<span><input id="q3a" name="q3" type="radio" value="no" onClick={this.handleNameChange}/><label for="q3a" class="radio-no">NO</label></span>
							</div>
						</li>
						<li data-input-trigger>
							<label class="fs-field-label fs-anim-upper" data-info="We'll make sure to use it all over">What breed is {this.state.q1}?</label>
							<select class="cs-select cs-skin-boxes fs-anim-lower">
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
							<label class="fs-field-label fs-anim-upper" for="q5">When is {this.state.q1}'s birthday?</label>
							<div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
							<span>
							<select class="fs-select" id="q5" name="q5">
								<option value="#588c75" >January</option>
								<option value="#b0c47f" >Feburary</option>
								<option value="#f3e395" >March</option>
								<option value="#f3ae73" >April</option>
								<option value="#da645a" >May</option>
							</select>
							</span>
							<span>
							<select class="fs-select" id="q5" name="q5">
								<option value="#588c75" >2020</option>
								<option value="#b0c47f" >2019</option>
								<option value="#f3e395" >2018</option>
								<option value="#f3ae73" >2017</option>
								<option value="#da645a" >2016</option>
							</select>
							</span>
							</div>
						</li>
						<li>
							<label class="fs-field-label fs-anim-upper" for="q6">How much does {this.state.q1} weigh?</label>
							<input class="fs-mark fs-anim-lower" id="q5" name="q5" type="number" placeholder="1000" step="100" min="100"/>
						</li>
					</ol>
					<button class="fs-submit" type="submit">提交问卷</button>
				</form>
			</div>
			</div>
        );
    }
}
export default CustomerPage;