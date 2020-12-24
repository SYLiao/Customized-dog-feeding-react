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
import ResultPanel from './ResultPanel';

class Result extends React.Component {
  state = {
    fixedDiets: null,
    index: 4,
    profile:(localStorage.getItem("profile") == undefined) ? null : JSON.parse(localStorage.getItem("profile")),
  }

  handleChange = (event) => {
    this.setState({
      index: event.target.value,
    })
    console.log(event.target.value);
  }

	componentDidMount(){
    if(this.state.profile === null || this.state.profile === undefined ||this.state.profile.progressNumber < 4) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
    let myDate = new Date();
    let lifePhaseId = 0;
    if(profile.q2.gender == "boy") {
      if(profile.q2.spayed == "notSpayed") {
        lifePhaseId = 5;
      }
      else {
        lifePhaseId = 4;
      }
    }
    else {
      if(profile.q2.spayed == "spayed") {
        lifePhaseId = 3;
      }
      else if (profile.q2.spayed == "nursing"){
        lifePhaseId = 2;
      }
      else {
        lifePhaseId = 1;
      }
    }
    axios.post("http://localhost:8081/mer/customer/calculate_model", 
          {
            name: localStorage.getItem("petName"),
            breedName: profile.q2.breed1,
            age: (myDate.getFullYear() - profile.q2.year) * 12 + (myDate.getMonth() - profile.q2.month),
            gender: profile.q2.gender,
            activeLevelId: 4 - profile.q2.activeLevelId,
            weight: profile.q2.weight,
            lifePhaseId: lifePhaseId,
            bodyConditionId: 3,
          })
          .then(
            resJson => {
              console.log(resJson);
          })
          .catch(error => {
              console.log(error);
              // this.props.history.push("/customer/page1");
            this.setState({
              ...this.state,
              isSubmitting: false,
              errorMessage: error.message || error.statusText
            });
          });
    }

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2}></ProgressBar>
            <div class="container">
              <div class="row align-items-center">
                <div class="pz-slide pz-slide--107">
                  <ResultPanel></ResultPanel>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
const result = withRouter(Result);
export default result;