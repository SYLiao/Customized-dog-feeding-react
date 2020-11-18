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
  }

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

  componentDidMount() {
    if(this.state.profile === null || this.state.profile.progressNumber < 8) {
      this.props.history.push("/customer/page1");
    }
    document.addEventListener('click', this.handleHide);
  }

  render() {
    return (
      <div>
        <Header></Header>
        <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
        <div class="container">
          <div class="row align-items-center">
            <div class="pz-slide pz-slide--107">
              <div class="pz-slide__content col-lg-6">
                <div class="pz-slide__content-header">
                  <div class="pz-content-header text-left">
                    <div class="content-header__eyebrow-container">
                      <div class="content-header__eyebrow text-rust">AGE</div></div>
                    <div class="content-header__title-2">
                      <h1>Does {this.state.profile.q1.name} have any known sensitivities to certain ingredients that we should ensure are excluded from his recipe?</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
                  <MultipleChoice choices={["谷物", "🥚", "🍗", "麦麸", "亚麻", "🥔", "clearAll"]} ></MultipleChoice>
                  </div>
                </div>
              </div>
              <Story profile={this.state.profile}></Story>
            </div>
          </div>
        </div>
        <div class="footer--quiz"><button class="btn btn-solid" disabled="">下一步</button></div>
      </div>
    )
  }
}
const allergen = withRouter(Allergen);
export default allergen;