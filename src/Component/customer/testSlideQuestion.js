import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import SlideChoice from './slideChoice'
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';
import Story from './story';

class TestPage extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
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
                      <h1>Mookey的出生日期?</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
                  <SlideChoice choiceMap={[1,2,3,4,5]} ></SlideChoice>
                    <div class="input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                      <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" />
                      <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">我不知道</label>
                    </div>
                  </div>
                </div>
              </div>
              <Story></Story>
            </div>
          </div>
        </div>
        <div class="footer--quiz"><button class="btn btn-solid" disabled="">下一步</button></div>
      </div>
    )
  }
}
const testPage = withRouter(TestPage);
export default testPage;