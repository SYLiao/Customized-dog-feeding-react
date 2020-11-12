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

class YourInfo extends React.Component {

	componentDidMount(){

	}

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
            <div class="container">
              <div class="pz-slide__content offset-xl-1 col-lg-6">
              <div class="pz-slide__content-header">
                <div class="pz-content-header text-center">
                  <div class="content-header__eyebrow-container">
                    <div class="content-header__eyebrow text-rust">Your pup deserves better nutrition!</div>
                    <div class="tooltip">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svg-icon svg-icon-question">
                        <g fill="none" fill-rule="evenodd">
                          <circle cx="12" cy="12" r="12" fill="#DD4F00"></circle>
                          <path fill="#FFF" fill-rule="nonzero" d="M12.522 13.838v-.99h.352c.586 0 1.095-.103 1.526-.308.432-.205.763-.491.993-.858.23-.368.346-.791.346-1.272 0-.508-.14-.963-.422-1.365-.281-.402-.697-.719-1.248-.95-.55-.23-1.21-.345-1.98-.345-1.114 0-2.077.246-2.889.738v1.582c.254-.195.598-.369 1.031-.521.434-.153.936-.229 1.506-.229.633 0 1.103.113 1.41.337.306.225.46.529.46.911 0 .383-.152.675-.455.876-.303.202-.78.302-1.432.302h-1.208v2.092h2.01zm-.972 2.766c.242 0 .457-.044.644-.132.188-.088.334-.208.44-.36a.894.894 0 0 0 .158-.522.875.875 0 0 0-.158-.51 1.051 1.051 0 0 0-.443-.357 1.536 1.536 0 0 0-.641-.13c-.243 0-.46.045-.65.133a1.1 1.1 0 0 0-.449.357.851.851 0 0 0-.161.507c0 .191.054.364.161.518.107.155.257.276.448.364.192.088.408.132.65.132z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div class="content-header__custom">
                    <h3>Your pup deserves better nutrition!</h3>
                    <p>Create their unique wellness plan by answering a few questions. This should only take about 3 minutes!</p>
                  </div>
                  <div class="content-header__title">
                    <h1>What's your&nbsp;dog's name?</h1></div>
                  <div class="content-header__subtitle content-header__subtitle--tight">Don’t worry, you can add another dog at the end of this quiz.</div></div>
              </div>
              <div class="pz-slide__form">
                <div class="pz-form alternate-form container-fluid">
                  <div class="pz-form__form-group form-group">
                    <div class="pz-form__form-group form-group">
                      <input id="quiz-input-1" type="text" required="" class="pz-control pz-control__input form-control is-invalid" aria-label="Dog name" placeholder="Dog name" maxlength="10" />
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
const yourInfo = withRouter(YourInfo);
export default yourInfo;