import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './mealplan/header';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';

class ProgressBar extends React.Component {
  state = {
    progress: this.props.trackBar,
    show1: ["", ""],
    show2: ["", ""],
    show3: ["", ""],
    show4: ["", ""],
    show5: ["", ""],
  }

  componentDidMount() {
    switch(this.state.progress){
      case 1:
        this.setState({
          show1: ["selected", ""],
        });
        break;
      case 2:
        this.setState({
          show1: ["previous", "selected"],
          show2: ["selected", ""],
        });
        break;
      case 3:
        this.setState({
          show1: ["previous", "selected"],
          show2: ["previous", "selected"],
          show3: ["selected", ""],
        });
        break;
      case 4:
        this.setState({
          show1: ["previous", "selected"],
          show2: ["previous", "selected"],
          show3: ["previous", "selected"],
          show4: ["selected", ""],
        });
        break;
        case 5:
          this.setState({
            show1: ["previous", "selected"],
            show2: ["previous", "selected"],
            show3: ["previous", "selected"],
            show4: ["previous", "selected"],
            show5: ["selected", ""],
          });
          break;
      default:
        break;
    }
  }

  handleRedirect = (event) => {
    if(event.currentTarget.id == 1){
        this.props.history.push("/customer/page1");
    }
    else if(event.currentTarget.id == 2){
      this.props.history.push("/customer/page2/dog");
    }
  }

  render() {
    return (
      <div className="">
        <div class="pz-progress-bar">
          <div class="pz-progress-bar__track">
            <div class="header__breadcrumbs">
              <div class="header__breadcrumbs__breadcrumb">
                <div id={1} class={"header__breadcrumbs__breadcrumb__text " + this.state.show1[0]} onClick={this.handleRedirect}>关于您</div>
                <div class={"header__breadcrumbs__breadcrumb__separator " + this.state.show1[1]}></div>
              </div>
              <div class="header__breadcrumbs__breadcrumb">
                <div id={2} class={"header__breadcrumbs__breadcrumb__text " + this.state.show2[0]} onClick={this.handleRedirect}>您的狗狗</div>
                <div class={"header__breadcrumbs__breadcrumb__separator " + this.state.show2[1]}></div>
              </div>
              <div class="header__breadcrumbs__breadcrumb">
                <div id={3} class={"header__breadcrumbs__breadcrumb__text " + this.state.show3[0]}>健康与忌口</div>
                <div class={"header__breadcrumbs__breadcrumb__separator " + this.state.show3[1]}></div>
              </div>
              <div class="header__breadcrumbs__breadcrumb">
                <div id={4} class={"header__breadcrumbs__breadcrumb__text " + this.state.show4[0]}>配方计划</div>
                <div class={"header__breadcrumbs__breadcrumb__separator " + this.state.show4[1]}></div>
              </div>
              <div class="header__breadcrumbs__breadcrumb">
                <div id={5} class={"header__breadcrumbs__breadcrumb__text " + this.state.show5[0]}>Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const progressBar = withRouter(ProgressBar);
export default progressBar;