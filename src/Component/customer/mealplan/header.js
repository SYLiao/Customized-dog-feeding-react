import React from 'react';
import { Steps, Popover } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

const { Step } = Steps;

const contents = ["YOU", "YOUR DOG", "RECIPES", "MEAL PLAN", "CHECKOUT"];

class Header extends React.Component {
  state = {
    currentNumber: this.props.progressNumber,
  }

  onChange = current => {
    console.log('onChange:', current);
    let pageNum = current + 1;
    this.setState({ currentNumber: current });
    this.props.history.push('/question' + pageNum);
  };


    render() {
        return (
            <nav class="navbar navbar-expand-lg nav-header">
            <a class="navbar-brand" href="#">DogFeeding</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse header-top" id="navbarNav">
                  <Steps current={this.state.currentNumber} onChange={this.onChange}>
                    <Step title="YOU" />
                    <Step title="YOUR DOG" />
                    <Step title="HEALTH"  />
                    <Step title="MEAL PLAN" />
                    <Step title="PAYMENT" />
                  </Steps>
            </div>
            <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </nav>
        );
    }
}
const header = withRouter(Header);
export default header;