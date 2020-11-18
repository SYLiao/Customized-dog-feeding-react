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

class Birthday extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
    dogName: localStorage.getItem("petName"),
		progressStory: 1,
		continue: false,
    profile:JSON.parse(localStorage.getItem("profile")),
    month: "",
    year: "",
    birthYear: 0,
    birthMonth: 12,
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

	componentDidMount(){
    document.addEventListener('click', this.handleHide);
    if(this.state.profile === null || this.state.profile.progressNumber < 4) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
    this.setState({
      month: profile.q2.month,
      year: profile.q2.year,
    });
  }
  
  handleMonth = (event) => {
    let profile = this.state.profile;
    this.setState({
      month: event.currentTarget.innerHTML,
      birthMonth: parseInt(event.currentTarget.innerHTML) - 1,
		})
		if(this.state.birthYear !== 0){
			let date = new Date();
			let year = date.getFullYear() - this.state.birthYear;
			let month = date.getMonth() - parseInt(event.currentTarget.innerHTML);
			if(month < 0){
				year -= 1;
				month = 11 + month;
			}
			let age = year + " year " + month + " month";
      profile.q2.age = age;
			this.setState({
				profile: profile,
			})
    }
    profile.q2.month = parseInt(event.currentTarget.innerHTML);
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  handleYear = (event) => {
    let profile = this.state.profile;
		this.setState({
      year: event.currentTarget.innerHTML,
      birthYear: parseInt(event.currentTarget.innerHTML) ,
		})
		if(this.state.birthMonth !== 12){
			let date = new Date();
			let year = date.getFullYear() - parseInt(event.currentTarget.innerHTML);
			let month = date.getMonth() - this.state.birthMonth;
			if(month < 0){
				year -= 1;
				month = 11 + month;
			}
			let age = year + " year " + month + " month";
      profile.q2.age = age;
			this.setState({
				profile: profile,
			})
    }
    profile.q2.year = parseInt(event.currentTarget.innerHTML);
    localStorage.setItem("profile", JSON.stringify(profile));
  }
  
  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page2/spayed");
  }

    render(){
        return(
          <div>
            <Header></Header>
            <ProgressBar trackBar={2} trackNum={3} questions={5} ></ProgressBar>
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
                        <div class="pz-select-group">
                          <div class="pz-select pz-select-1 css-2b097c-container" id="1">
                            <div class="pz-select__control css-u41ve3-control">
                              <div class="pz-select__value-container pz-select__value-container--has-value css-1hwfws3">
                                <div class="pz-select__single-value css-nztp7a-singleValue">{this.state.month}</div>
                                <div class="css-1v9zfle">
                                  <div class="pz-select__input" style={{display: 'inline-block'}}>
                                    <input class="pz-select__input" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-2-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" style={{boxSizing: 'content-box', width: '2px', background: '0px center', border: '0px', fontSize: 'inherit', opacity: '0', outline: '0px', padding: '0px', color: 'inherit'}} />
                                    {/* <div className="birth-div"></div> */}
                                  </div>
                                </div>
                              </div>
                              <div class="pz-select__indicators css-1wy0on6">
                                <div aria-hidden="true" class="pz-select__indicator pz-select__dropdown-indicator css-xbhri0-indicatorContainer" onClick={this.handleMenu}>
                                  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-19bqh2r">
                                    <path fill="#dd4f00" fill-rule="nonzero" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div class={"pz-select__menu css-i0syzg-menu " + this.state.menu1}>
                                <div class="pz-select__menu-list css-11unzgr">
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="1" tabindex="-1" onClick={this.handleMonth}>1</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                     id="2" tabindex="-1" onClick={this.handleMonth}>2</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="3"
                                        tabindex="-1" onClick={this.handleMonth}>3</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="4"
                                        tabindex="-1" onClick={this.handleMonth}>4</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-4"
                                        tabindex="-1" onClick={this.handleMonth}>5</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-5"
                                        tabindex="-1" onClick={this.handleMonth}>6</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-6"
                                        tabindex="-1" onClick={this.handleMonth}>7</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-7"
                                        tabindex="-1" onClick={this.handleMonth}>8</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-8"
                                        tabindex="-1" onClick={this.handleMonth}>9</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"id="react-select-2-option-9"
                                        tabindex="-1" onClick={this.handleMonth}>10</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-10"
                                        tabindex="-1" onClick={this.handleMonth}>11</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-11"
                                        tabindex="-1" onClick={this.handleMonth}>12</div>
                                </div>
                            </div>
                          </div>
                          <div class="pz-select pz-select-1 css-2b097c-container" id="1">
                          <div class="pz-select__control css-u41ve3-control">
                              <div class="pz-select__value-container pz-select__value-container--has-value css-1hwfws3">
                              <div class="pz-select__single-value css-nztp7a-singleValue">{this.state.year}</div>
                                <div class="css-1v9zfle">
                                  <div class="pz-select__input" style={{display: 'inline-block'}}>
                                    <input class="pz-select__input" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" style={{boxSizing: 'content-box', width: '2px', background: '0px center', border: '0px', fontSize: 'inherit', opacity: '0', outline: '0px', padding: '0px', color: 'inherit'}}/>
                                    <div className="birth-div"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="pz-select__indicators css-1wy0on6">
                                <span class="pz-select__indicator-separator css-1auwtm3-indicatorSeparator"></span>
                                <div aria-hidden="true" class="pz-select__indicator pz-select__dropdown-indicator css-xbhri0-indicatorContainer" onClick={this.handleMenu2}>
                                  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-19bqh2r">
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div class={"pz-select__menu css-i0syzg-menu " + this.state.menu2}>
                                <div class="pz-select__menu-list css-11unzgr">
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="react-select-2-option-0" tabindex="-1" onClick={this.handleYear}>2020</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-1"
                                        tabindex="-1" onClick={this.handleYear}>2019</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-2"
                                        tabindex="-1" onClick={this.handleYear}>2018</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-3"
                                        tabindex="-1" onClick={this.handleYear}>2017</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-4"
                                        tabindex="-1" onClick={this.handleYear}>2016</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-5"
                                        tabindex="-1" onClick={this.handleYear}>2015</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-6"
                                        tabindex="-1" onClick={this.handleYear}>2014</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-7"
                                        tabindex="-1" onClick={this.handleYear}>2013</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-8"
                                        tabindex="-1" onClick={this.handleYear}>2012</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-9"
                                        tabindex="-1" onClick={this.handleYear}>2011</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-10"
                                        tabindex="-1" onClick={this.handleYear}>2010</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option" id="react-select-2-option-11"
                                        tabindex="-1" onClick={this.handleYear}>2009</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="react-select-2-option-0" tabindex="-1" onClick={this.handleYear}>2008</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="react-select-2-option-0" tabindex="-1" onClick={this.handleYear}>2007</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="react-select-2-option-0" tabindex="-1" onClick={this.handleYear}>2006</div>
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id="react-select-2-option-0" tabindex="-1" onClick={this.handleYear}>2005</div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="input-4 pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                          <input type="checkbox" id="input-checkbox-4" name="4" class="pz-control__input custom-control-input" />
                          <label class="pz-control__label custom-control-label custom-control-label--small-text" for="input-checkbox-4">我不知道</label>
                          </div>
                      </div>
                    </div>
                  </div>
                <Story profile={this.state.profile} progress={1}></Story>
                </div>
              </div>
            </div>
            <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
          </div>
        )
    }
}
const birthday = withRouter(Birthday);
export default birthday;