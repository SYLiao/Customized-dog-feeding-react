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
import { Card, Col, Row } from 'antd';
import Story from './story';

class Allergen extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
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
    axios.get("http://localhost:8081/product/get/allergen/get_all_allergen")
      .then(resJson => {
        this.setState({
          choices: resJson.data.data.map(allergen => allergen.allergenName),
          selected: this.state.profile.q3.allergen,
          isloading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleMenu = (event) => {
    event.nativeEvent.stopImmediatePropagation();
    this.setState({
      menu1: "",
    })
  }

  handleHide = () => {
    this.setState({
      menu1: "display-menu",
      menu2: "display-menu",
    })
  }

  handleMenu2 = (event) => {
    event.nativeEvent.stopImmediatePropagation();
    this.setState({
      menu2: "",
    })
  }

  handleUpdate = event => {
    console.log(event)
    //TODO add selectedValue into profile
    var selected = [];

    this.state.choices.map((choice) => {
      if (event.selectedMap[choice]) {
        selected.push(choice);
      } 
    })
    let profile = this.state.profile;
    profile.q3.allergen = selected;
    this.setState({
      profile: profile,
      selected: selected
    })
    console.log(profile.q3)
    localStorage.setItem("profile", JSON.stringify(profile));
  }


  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page4/brand");
  }

  render() {
    if (this.state.isloading) {
      return (
        <div>
        <Header></Header>
        <ProgressBar trackBar={3} trackNum={0} questions={5} ></ProgressBar>
        <div class="container">
          <div class="row align-items-center">
            <div class="pz-slide pz-slide--107">
              <div class="pz-slide__content col-lg-6">
                <div class="pz-slide__content-header">
                  <div class="pz-content-header text-left">
                    <div class="content-header__eyebrow-container">
                      <div class="content-header__eyebrow text-rust">AGE</div></div>
                    <div class="content-header__title-2">
                      <h1> {this.state.profile.q2.name}对下列哪些食物原材料过敏呢？我们将会从配方中移除对应食材。</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
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
          <ProgressBar trackBar={3} trackNum={0} questions={5} ></ProgressBar>
          <div class="container">
            <div class="row align-items-center">
              <div class="pz-slide pz-slide--107">
                <div class="pz-slide__content col-lg-6">
                  <div class="pz-slide__content-header">
                    <div class="pz-content-header text-left">
                      <div class="content-header__eyebrow-container">
                        <div class="content-header__eyebrow text-rust">AGE</div></div>
                      <div class="content-header__title-2">
                        <h1> {this.state.profile.q2.name}对下列哪些食物原材料过敏呢？我们将会从配方中移除对应食材。</h1>
                      </div>
                    </div>
                    <div class="pz-form__form-group form-group">
                    <MultipleChoice choices={this.state.choices} selected={this.state.selected} onchange={this.handleUpdate} ></MultipleChoice>
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
const allergen = withRouter(Allergen);
export default allergen;