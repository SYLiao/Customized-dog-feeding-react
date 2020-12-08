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

class dietSpec extends React.Component {
  state = {
    profile: this.props.profile,
    name: localStorage.getItem("name"),
    progress: this.props.progress,
    diets:this.props.diet,
    index: this.props.index,
  }

	componentDidMount(){
    if(this.state.index !== 4) {
      this.setState({
        diet: this.state.diets[this.state.index],
      });
      console.log(this.state.diet);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      diets: nextProps.diet,
    })
  }

    render(){
      let diet = {}
      if(this.state.index !== 4) {
        diet = this.state.diets[this.state.index];
        return(
          <div class="diet-card d-lg-block">
              <div class="pet-overview-card__header text-center text-uppercase bg-sun">
              <div class="text-smallest color-chew-toy">
                <div class="nutrition-section--beef">
                  <div class="nutrition-row">
                    <div class="nutrition-row__label">
                      <h2>卡路里 (kcal/kg)</h2>
                    </div>
                    <div class="nutrition-row__value">
                      <h2>{diet.calorie}</h2>
                    </div>
                  </div>
                </div>
                <div class="nutrition-section--beef">
                  <div class="nutrition-row padding-bottom-small">
                    <h2>营养素分析</h2>
                  </div>
                  <div class="nutrition-row">
                    <div class="nutrition-row__label">
                      粗蛋白
                    </div>
                    <div class="nutrition-row__value">
                      {diet.minCrudProtein}% min
                    </div>
                  </div>
                  <div class="nutrition-row">
                    <div class="nutrition-row__label">
                      粗脂肪
                    </div>
                    <div class="nutrition-row__value">
                      {diet.minCrudFat}% min
                    </div>
                  </div>
                  <div class="nutrition-row">
                    <div class="nutrition-row__label">
                      粗纤维
                    </div>
                    <div class="nutrition-row__value">
                      {diet.maxCrudFiber}% max
                    </div>
                  </div>
                  <div class="nutrition-row">
                    <div class="nutrition-row__label">
                      水份
                    </div>
                    <div class="nutrition-row__value">
                      {diet.maxMoisture}% max
                    </div>
                  </div>
                </div>
                <div class="padding-top ingredient">
                  <b>配料</b>: {diet.ingredient}
                </div>
              </div>
              </div>
              
          </div>
    )
      }
      else {
        return (
          <div>Please select meal plan for Mookey</div>
        );
      }
        
    }

}
const diet = withRouter(dietSpec);
export default diet;