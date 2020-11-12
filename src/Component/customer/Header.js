import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';

class Header extends React.Component {

	componentDidMount(){

	}

    render(){
        return(
          <div className="">
            <header className="header-page" data-header>
              <div className="header-container">
                <div className="header-nav header-nav--left">
                  <ul className="header-nac__menu">
                    <li className="header-nav__menu-item">
                    <button class="header-nav__menu-back">
                      <div class="arrow--left mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" class="icon-arrow-right">
                          <path fill="#dd4f00" fill-rule="nonzero" d="M19.806 7.739L14.547 1.68A1.015 1.015 0 1 1 16.081.35l6.68 7.696c.33.378.332.94.009 1.322l-6.681 7.885a1.015 1.015 0 0 1-1.55-1.312l5.23-6.172H1.014a1.015 1.015 0 0 1 0-2.03h18.791z"></path>
                        </svg>
                      </div>
                      <div class="d-none d-lg-block">返回上一步</div>
                    </button>
                    </li>

                  </ul>
                </div>
                <div class="header-nav header-nav--left header-nav--logo">
                  {/* <div class="h1" itemscope="" itemtype="http://schema.org/Organization">Tailored®</div> */}
                  <a href="/" itemprop="url" class="header-logo" aria-label="Logo">
                    <img src="/Users/shiyaoliao/customized_dog_food_react/customized_dog_food/src/img/pet_food.jpg" className="iogo-img" itemprop="logo" />
                  </a>
                </div>
                <div className="header-nav--right">
                  <div class="header__discount">
                    <div class="header__discount__img">
                      <div class="header__discount__img__icon"></div>
                    </div>
                    <div class="header__discount__text">
                      <div class="header__discount__text__bold">20% OFF</div>
                      <span class="header__discount__weeks">Applied at checkout</span></div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        )
    }
}
const header = withRouter(Header);
export default header;