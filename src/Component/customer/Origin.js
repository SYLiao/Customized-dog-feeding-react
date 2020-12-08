import React from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Dropdown from './DropDown'
import { withRouter, Redirect } from 'react-router';
import Story from './story';
import DietStory from './dietStory';

class Origin extends React.Component {
  state = {
    menu1: "display-menu",
    menu2: "display-menu",
    profile: JSON.parse(localStorage.getItem("profile")),
    selected: JSON.parse(localStorage.getItem("profile")).q3.origin
  }

  async componentDidMount() {
    if(this.state.profile === null || this.state.profile.progressNumber < 8) {
      this.props.history.push("/customer/page1");
    }
    document.addEventListener('click', this.handleHide);
  }

  handleUpdate = event => {
    console.log(event)
    //TODO add selectedValue into profile
    // localStorage.setItem("profile", JSON.stringify(profile));
    this.updateProfile(event);
  }


  updateProfile(value) {
    let profile = this.state.profile;
    profile.q3.origin = value;
    this.setState({
      profile: profile,
      selected: value
    })
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  handleSubmit = (event) => {
    let profile = this.state.profile;
    profile.progressNumber += 1;
    localStorage.setItem("profile", JSON.stringify(this.state.profile));
    this.props.history.push("/customer/product/result");
  }

  render() {
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
                      <div class="content-header__eyebrow text-rust">种类</div></div>
                    <div class="content-header__title-2">
                      <h1> 您倾向于选择的狗粮种类是？</h1>
                    </div>
                  </div>
                  <div class="pz-form__form-group form-group">
                    <div class="pz-select-group">
                      <Dropdown choices={["冻干粮", "进口粮", "新鲜湿粮"]} selectedValue={this.state.selected} onchange={this.handleUpdate}></Dropdown>
                    </div>
                  </div>
                </div>
              </div>
              <Story profile={this.state.profile} progress={5}></Story>
              {/* <DietStory profile={this.state.profile} progress={5}></DietStory> */}
            </div>
          </div>
        </div>
        <div class="footer--quiz"><button class="btn btn-solid" disabled="" onClick={this.handleSubmit}>下一步</button></div>
      </div>
    )
  }
}
const origin = withRouter(Origin);
export default origin;