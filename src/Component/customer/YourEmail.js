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

	componentDidMount(){

	}

    render(){
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
                      <input id="quiz-input-1" type="email" required="" class="pz-control pz-control__input form-control is-invalid" aria-label="Dog name" placeholder="Your email" maxlength="30" />
                      <p class="pz-control__input-limit">0/10</p>
                      <div class="invalid-feedback text-left">This field is required</div></div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="">下一步</button></div>
          </div>
        )
    }
}
const yourEmail = withRouter(YourEmail);
export default yourEmail;