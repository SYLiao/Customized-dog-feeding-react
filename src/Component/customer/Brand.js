import React from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Dropdown from './DropDown'
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import Story from './story';


class Brand extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
    profile:JSON.parse(localStorage.getItem("profile")),
    choices: [],
    selected: "",
    isloading: true,
    other: false
  }

  async componentDidMount() {
    await this.getChoices();
    if(this.state.profile === null || this.state.profile.progressNumber < 8) {
      this.props.history.push("/customer/page1");
    }
    document.addEventListener('click', this.handleHide);
  }

  getChoices() {
    axios.get("http://localhost:8081/product/get/brand/get_all_brand")
      .then(resJson => {
        this.setState({
          choices: resJson.data.data.map(brand => brand.brandName),
          selected: this.state.profile.q3.brand,
          isloading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate = event => {
    console.log(event);
    //TODO add selectedValue into profile
    // localStorage.setItem("profile", JSON.stringify(profile));
    this.updateProfile(event);
  }

  updateProfile(value) {
    let profile = this.state.profile;
    profile.q3.brand = value;
    this.setState({
      profile: profile,
      selected: value
    })
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  handleOtherBrand = (event) => {
    this.setState({
      other: event.target.checked,
    })
    console.log(event.target)
  }

  handleInput = (e) => {
    this.updateProfile(e.target.value);
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/page4/proteinOrigin");
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
                      <div class="content-header__eyebrow text-rust">品牌</div></div>
                    <div class="content-header__title-2">
                      <h1> {this.state.profile.q2.name}当前主要的狗粮品牌是？</h1>
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
                        <div class="content-header__eyebrow text-rust">品牌</div></div>
                      <div class="content-header__title-2">
                        <h1> {this.state.profile.q2.name}当前主要的狗粮品牌是？</h1>
                      </div>
                    </div>
                    <div class="pz-form__form-group form-group container-fluid">
                      <div class="pz-select-group">
                        <Dropdown choices={this.state.choices} selectedValue={this.state.selected} onchange={this.handleUpdate}></Dropdown>
                      </div>
                      <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg">
                        <input type="checkbox" id="dontknow" name="4" class="pz-control__input custom-control-input" />
                        <label class="pz-control__label custom-control-label custom-control-label--small-text" for="dontknow">我不知道</label>
                      </div>
                      <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                        onChange={this.handleOtherBrand}>
                        <input type="checkbox" id="other" name="4" class="pz-control__input custom-control-input" />
                        <label class="pz-control__label custom-control-label custom-control-label--small-text" for="other">其他</label>
                      </div>
                    </div>
                    {  
                      this.state.other &&
                      <div class="pz-form alternate-form container-fluid">
                        <div class="pz-form__form-group form-group">
                          <div class="pz-form__form-group form-group">
                            <input id="quiz-input-1" type="text" required="" class="pz-control pz-control__input form-control"  placeholder="请输入品牌名称" 
                            name="weight" onChange={this.handleInput}/>
                            <div class="invalid-feedback text-left">请输入品牌</div></div>
                        </div>
                      </div>
                    }
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
const brand = withRouter(Brand);
export default brand;