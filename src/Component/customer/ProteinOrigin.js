import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import MultipleChoice from './MultipleChoice'
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import Story from './story';

class ProteinOrigin extends React.Component {
  state = {
    profile:JSON.parse(localStorage.getItem("profile")),
    choices: [],
    selected: [],
    isloading: true
  }

  async componentDidMount() {
    await this.getChoices();
    if(this.state.profile === null || this.state.profile.progressNumber < 8) {
      this.props.history.push("/customer/page1");
    }
    document.addEventListener('click', this.handleHide);
  }

  getChoices() {
    axios.get("http://localhost:8081/product/get/ingredient/get_all_ingredient")
      .then(resJson => {
        this.setState({
          choices: resJson.data.data.map(ingredient => ingredient.ingredientName),
          selected: this.state.profile.q3.proteinOrigin,
          isloading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate = event => {
    var selected = [];
    this.state.choices.map((choice) => {
      if (event.selectedMap[choice]) {
        selected.push(choice);
      } 
    })
    let profile = this.state.profile;
    profile.q3.proteinOrigin = selected;
    this.setState({
      profile: profile,
      selected: selected
    })
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page4/price");
  }

  render() {
    if (this.state.isloading) {
      return (
        <div>
          <Header></Header>
          <ProgressBar trackBar={4} trackNum={0} questions={5} ></ProgressBar>
          <div class="container">
            <div class="row align-items-center">
              <div class="pz-slide pz-slide--107">
                <div class="pz-slide__content col-lg-6">
                  <div class="pz-slide__content-header">
                    <div class="pz-content-header text-left">
                      <div class="content-header__eyebrow-container">
                        <div class="content-header__eyebrow text-rust">蛋白倾向</div></div>
                      <div class="content-header__title-2">
                        <h1> 您希望{this.state.profile.q2.name}主要从下列哪种食材中获得蛋白质</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <Story profile={this.state.profile} progress={5}></Story>
              </div>
            </div>
          </div>
          <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
      </div>
      )
    } else {
      return (
        <div>
          <Header></Header>
          <ProgressBar trackBar={4} trackNum={0} questions={5} ></ProgressBar>
          <div class="container">
            <div class="row align-items-center">
              <div class="pz-slide pz-slide--107">
                <div class="pz-slide__content col-lg-6">
                  <div class="pz-slide__content-header">
                    <div class="pz-content-header text-left">
                      <div class="content-header__eyebrow-container">
                        <div class="content-header__eyebrow text-rust">蛋白倾向</div></div>
                      <div class="content-header__title-2">
                        <h1> 您希望{this.state.profile.q2.name}主要从下列哪种食材中获得蛋白质</h1>
                      </div>
                    </div>
                    <div class="pz-form__form-group form-group">
                      <MultipleChoice choices={this.state.choices} selected={this.state.selected} onchange={this.handleUpdate}></MultipleChoice>
                    </div>
                  </div>
                </div>
                <Story profile={this.state.profile} progress={5}></Story>
              </div>
            </div>
          </div>
          <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
        </div>
      )
    }
  }
}
const proteinOrigin = withRouter(ProteinOrigin);
export default proteinOrigin;