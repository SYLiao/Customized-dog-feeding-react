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

class Story extends React.Component {

	componentDidMount(){

	}

    render(){
        return(
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
        )
    }
}
const story = withRouter(Story);
export default story;