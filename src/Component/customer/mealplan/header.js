import React from 'react';
import { Steps, Popover } from 'antd';
import styles from '../../../less/header.less';

const { Step } = Steps;

const contents = ["YOU", "YOUR DOG", "RECIPES", "MEAL PLAN", "CHECKOUT"];

class Header extends React.Component {
  state = {
    progressNumber: this.props.progressNumber,
  }

  componentDidMount(){
    let change = document.getElementById(this.state.progressNumber);
  //   if(this.state.progressNumber == "5"){
  //     change.innerHTML = '<a class="nav-link a-navi" href="#">' + contents[4] + '</a>';
  //   }
  //   else{
  //     change.innerHTML = '<a class="nav-link a-navi" href="#">' + contents[this.state.progressNumber - 1] + '  ---</a>';
  //   }
  }


    render() {
      const customDot = (dot, { status, index }) => (
        <Popover
          content={
            <span>
              step {index} status: {status}
            </span>
          }
        >
          {dot}
        </Popover>
      );
        return (
          //   <nav class="navbar navbar-expand-lg bg-primary">
          //   <a class="navbar-brand" href="#">DogFeeding</a>
          //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          //     <span class="navbar-toggler-icon"></span>
          //   </button>
          //   <div class="collapse navbar-collapse header-top" id="navbarNav">
          //     <ul class="navbar-nav ul-nav">
          //       <li class="nav-item">
          //         <a class="nav-link a-navi" href="#" id="1">YOU  ---</a>
          //       </li>
          //       <li class="nav-item active">
          //         <a class="nav-link a-navi" href="#" id="2">YOUR DOG  ---</a>
          //       </li>
          //       <li class="nav-item active">
          //         <a class="nav-link a-navi" href="#" id="3">RECIPES  ---</a>
          //       </li>
          //       <li class="nav-item">
          //         <a class="nav-link a-navi" href="#" id="4">MEAL PLAN  ---</a>
          //       </li>
          //       <li class="nav-item active">
          //         <a class="nav-link a-navi" href="#" id="5">CHECKOUT</a>
          //       </li>
          //     </ul>
          //   </div>
          // </nav>
          <nav class="navbar navbar-dark bg-primary">
                  <Steps current={1} progressDot={customDot} className={styles.customSelect}>
                    <Step title="YOU" description="You can hover on the dot."><a>haibjn</a></Step>
                    <Step title="YOUR DOG" description="You can hover on the dot." />
                    <Step title="RECIPES" description="You can hover on the dot." />
                    <Step title="MEAL PLAN" description="You can hover on the dot." />
                    <Step title="PAYMENT" description="You can hover on the dot." />
                  </Steps>
          </nav>
        );
    }
}
export default Header;