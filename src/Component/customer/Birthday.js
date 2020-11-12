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

class Birthday extends React.Component {

	componentDidMount(){

	}

    render(){
        return(
          <div className="">
            <Header></Header>
            <ProgressBar trackBar={2} trackNum={0} questions={5} ></ProgressBar>
            <div class="container">
              <div class="row align-items-center">
                <div class="pz-slide pz-slide--107">
                  <div class="pz-slide__content col-lg-6">
                    <div class="pz-slide__content-header">
                      <div class="pz-content-header text-left">
                        <div class="content-header__eyebrow-container">
                          <div class="content-header__eyebrow text-rust">Gender</div></div>
                        <div class="content-header__title">
                          <h1>Mookey是男孩还是女孩?</h1>
                        </div>
                      </div>
                    </div>
                      <div class="options options--images genders__options">
                        <div class="option option--image selected">
                          <img src="/static/media/boy.65fc14b6.jpg" width="100%" alt="" />
                          <div class="option__text">
                            <div class="option__text__label with-margin">Boy</div></div>
                        </div>
                        <div class="option option--image">
                          <img src="/static/media/girl.fbaf4093.jpg" width="100%" alt="" />
                          <div class="option__text">
                            <div class="option__text__label with-margin">Girl</div></div>
                        </div>
                    </div>
                  </div>
                <div class="pz-slide__pet-overview-card pz-pet-overview-card pet-overview-card offset-lg-1 d-none d-lg-block">
                  <div class="pet-overview-card__header text-center text-uppercase bg-sun">
                    <div class="pet-overview-card__eyebrow">
                      <div class="badge--tailored">
                        <img src="https://cdn.shopify.com/s/files/1/0276/0337/0068/files/tailored-recipe-for_3x_1cb939b7-dd7d-4dae-989e-d2784b7e56b6.png" alt="Recipe Tailored For" class="icon" /></div>
                    </div>
                    <h2 class="pet-overview-card__title font-ginto-nord-black">Mookey</h2></div>
                  <div class="pet-overview-card__body">
                    <div class="pet-overview-card__list">
                      <div class="pet-overview-card__list-item is-incomplete">
                        <div class="pet-overview-card__list-item-icon"></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class="pet-overview-card__list-item-label">Age</div>
                          <div class="pet-overview-card__list-item-value">Value</div></div>
                      </div>
                      <div class="pet-overview-card__list-item is-incomplete">
                        <div class="pet-overview-card__list-item-icon"></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class="pet-overview-card__list-item-label">Size</div>
                          <div class="pet-overview-card__list-item-value">Value</div></div>
                      </div>
                      <div class="pet-overview-card__list-item is-incomplete">
                        <div class="pet-overview-card__list-item-icon"></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class="pet-overview-card__list-item-label">Activity Level</div>
                          <div class="pet-overview-card__list-item-value">Value</div></div>
                      </div>
                      <div class="pet-overview-card__list-item is-incomplete">
                        <div class="pet-overview-card__list-item-icon"></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class="pet-overview-card__list-item-label">Has Sensitivities</div>
                          <div class="pet-overview-card__list-item-value">Value</div></div>
                      </div>
                      <div class="pet-overview-card__list-item is-incomplete">
                        <div class="pet-overview-card__list-item-icon"></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class="pet-overview-card__list-item-label">Wellness Goals</div>
                          <div class="pet-overview-card__list-item-value">Value</div></div>
                      </div>
                    </div>
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
const birthday = withRouter(Birthday);
export default birthday;