import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';
import { Form, Col, Row } from 'antd';
import { withRouter, Redirect } from 'react-router';

class Question3 extends React.Component {
	state = {
		return: false,
		continue: false,
		FrequentlyChewsPaws: false,
		LooseStool: false,
		HotSpots: false,
		Vomiting: false,
		FrequentSkinInfections: false,
		ExcessiveGas: false,
		progressNumber: 2,
		Grains: false,
		Eggs: false,
		Chicken: false,
		Gluten: false,
		RedMeat: false,
		Flax: false,
		Potatoes: false,
		None: false,
		profile:JSON.parse(localStorage.getItem("profile")),
		name: localStorage.getItem("name"),
		petName: localStorage.getItem("petName"),
	}

		handleNameChange = (event) => {
			let profile = this.state.profile;
			console.log(event.target);
			profile.q3[event.target.name] = !this.state[event.target.name];
			this.setState({
				[event.target.name]: !this.state[event.target.name],
				profile: profile,
			});
			localStorage.setItem("profile", JSON.stringify(profile));
			console.log(this.state);
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
			<Header progressNumber={2}></Header>
			<div class="fs-form-wrap" id="fs-form-wrap">
				<form id="myform" class="fs-form fs-form-full" autocomplete="off">
					<ol class="fs-fields">
					<li>
						<label class="fs-field-label fs-anim-upper" for="q1">Health Concerns</label>
						<div class="fs-anim-lower subtitle" >Does Mookey ever experience any of the following problems? If so, he may benefit from a sensitive blend.</div>
								<Form class="fs-anim-upper">
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox1' name='FrequentlyChewsPaws' checked={this.state.FrequentlyChewsPaws}
												onClick={this.handleNameChange}/>
												<label for='checkbox1'>Frequently Chews Paws</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox2' name='LooseStool' checked={this.state.LooseStool} onClick={this.handleNameChange}/>
												<label for='checkbox2'>Loose Stool</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox3' name='HotSpots'
												checked={this.state.HotSpots} onClick={this.handleNameChange}/>
												<label for='checkbox3'>Hot Spots</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox4' name='Vomiting'
												checked={this.state.Vomiting} onClick={this.handleNameChange}/>
												<label for='checkbox4'>Vomiting</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox5' name='FrequentSkinInfections'
												checked={this.state.FrequentSkinInfections} onClick={this.handleNameChange}/>
												<label for='checkbox5'>Frequent Skin Infections</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox6' name='ExcessiveGas'/>
												<label  for='checkbox6'>Excessive Gas</label>
											</div>
										</Col>
									</Row>
								</Form>
						</li>
						<li>
						<label class="fs-field-label fs-anim-upper" for="q1">Ingredient Exclusions</label>
						<div class="fs-anim-lower subtitle" >Does Mookey have any known sensitivities to certain ingredients that we should ensure are excluded from his recipe?</div>
								<Form class="fs-anim-upper">
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox1' name='checkboox[]'/>
												<label for='checkbox1'>Grains</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox2' name='checkboox[]'/>
												<label for='checkbox2'>Eggs</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox3' name='checkboox[]'/>
												<label for='checkbox3'>Chicken</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox4' name='checkboox[]'/>
												<label for='checkbox4'>Gluten</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox5' name='checkboox[]'/>
												<label for='checkbox5'>Red Meat</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox6' name='checkboox[]'/>
												<label class="check_label" for='checkbox6'>Flax</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox7' name='checkboox[]'/>
												<label for='checkbox7'>Potatoes</label>
											</div>
										</Col>
										<Col span={8}>
											<div class='checkbox'>
												<input type='checkbox' id='checkbox8' name='checkboox[]'/>
												<label class="check_label" for='checkbox8'>None</label>
											</div>
										</Col>
									</Row>
								</Form>
						</li>
						<li data-input-trigger>
							<label class="fs-field-label fs-anim-upper" for="q3">{this.state.q1}How would you describe Mookey's ability to get to his feet?</label>
							<div class="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
							<span><input id="q3c" name="q3" type="radio" value="no" onClick={this.handleNameChange}/><label for="q3c" class="radio-no">SLOW<br></br>Struggles a bit to get to his feet</label></span>
								<span><input id="q3b" name="q3" type="radio" value="yes" onClick={this.handleNameChange}/><label for="q3b" class="radio-yes">EASY, NO BIG DEAL<br></br>Gets up easily</label></span>
								<span><input id="q3a" name="q3" type="radio" value="no" onClick={this.handleNameChange}/><label for="q3a" class="radio-no">SPEEDY<br></br>Lightning quick, bounds right up</label></span>
							</div>
						</li>
					</ol>
					<button class="fs-submit" type="submit" onClick={this.handleSubmit}>提交问卷</button>
				</form>
			</div>
			</div>
        );
    }
}
const question3 = withRouter(Question3);
export default question3;