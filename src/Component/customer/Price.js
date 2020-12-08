import React from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import Story from './story';

class Price extends React.Component {

  state = {
    petName: localStorage.getItem("petName"),
    progressNumber: 1,
    continue: false,
    profile: JSON.parse(localStorage.getItem("profile")),
    upperPrice: -1,
    lowerPrice: -1
  }

  componentDidMount() {
    if (this.state.profile === null || this.state.profile.progressNumber < 7) {
      this.props.history.push("/customer/page1");
    }
    let profile = this.state.profile;
    this.setState({
      upperPrice: profile.q3.upperPrice,
      lowerPrice: profile.q3.lowerPrice
    });
  }

  handleChange = (event) => {
    event.target.classList.remove("is-invalid");
    this.updateProfile(event.target.value, event.target.id)
  }

  updateProfile(value, targetId) {
    let profile = this.state.profile;
    if (targetId == "lowerPrice") {
      profile.q3.lowerPrice = value;
      this.setState({
        lowerPrice: value
      })
    } else if (targetId == "upperPrice") {
      profile.q3.upperPrice = value;
      this.setState({
        upperPrice: value
      })
    }
    this.setState({
      profile: profile,
    })
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  handleSubmit = (event) => {
    let lowerPrice = document.getElementById("lowerPrice");
    let upperPrice = document.getElementById("upperPrice");
    if (lowerPrice.value == "") {
      lowerPrice.classList.add("is-invalid");
    } else if (upperPrice.value == "") {
      upperPrice.classList.add("is-invalid");
    } else {
      let profile = this.state.profile;
      profile.progressNumber += 1;
      localStorage.setItem("profile", JSON.stringify(this.state.profile));
      this.props.history.push("/customer/page4/origin");
    }
  }

  render() {
    return (
      <div className="">
        <Header></Header>
        <ProgressBar trackBar={4} trackNum={0} questions={5} ></ProgressBar>
        <div class="container">
          <div class="row align-items-center">
            <div class="pz-slide pz-slide--107">
              <div class="pz-slide__content col-lg-6">
                <div class="pz-slide__content-header">
                  <div class="pz-content-header text-left">
                    <div class="content-header__eyebrow-container">
                      <div class="content-header__eyebrow text-rust">Price</div></div>
                    <div class="content-header__title">
                      <h1>你的目标价格区间是？</h1>
                    </div>
                  </div>
                </div>
                <div style={{ height: "40px" }}></div>
                <div class="pz-form alternate-form container-fluid">
                  <div class="form-group-flex">
                  <h1 style={{marginTop: "-5px", fontSize: "7rem"}}> ￥ </h1>
                    <div class="pz-form__form-group form-group">
                      <input id="lowerPrice" type="number" value={this.state.lowerPrice} required="" class="pz-control pz-control__input form-control" placeholder="不低于"
                        name="lowerPrice" onChange={this.handleChange} />
                      <div class="invalid-feedback text-left">多少钱啊到底</div>
                    </div>
                    <h1 style={{marginTop: "-5px", fontSize: "7rem", marginLeft: "30px"}}> ~ </h1>
                    <h1 style={{marginTop: "-5px", fontSize: "7rem", marginLeft: "30px", marginRight: "5px"}}> ￥ </h1>
                    <div class="pz-form__form-group form-group">
                      <input id="upperPrice" type="number" value={this.state.upperPrice} required="" class="pz-control pz-control__input form-control" placeholder="不高于"
                        name="upperPrice" onChange={this.handleChange} />
                      <div class="invalid-feedback text-left">多少钱啊到底</div>
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
  }
}
const price = withRouter(Price);
export default price;