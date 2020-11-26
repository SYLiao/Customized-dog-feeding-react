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
  }

	componentDidMount(){
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({update: nextProps.progress});
  }

    render(){
        return(
              <div class="diet-card d-lg-block">
                  <div class="pet-overview-card__header text-center text-uppercase bg-sun">
                  <div class="text-smallest color-chew-toy">
                    <div class="nutrition-section--beef">
                      <div class="nutrition-row">
                        <div class="nutrition-row__label">
                          <h2>Calories (kcal/kg)</h2>
                        </div>
                        <div class="nutrition-row__value">
                          <h2>1239</h2>
                        </div>
                      </div>
                    </div>
                    <div class="nutrition-section--beef">
                      <div class="nutrition-row padding-bottom-small">
                        <h2>Guaranteed Analysis</h2>
                      </div>
                      <div class="nutrition-row">
                        <div class="nutrition-row__label">
                          Crude Protein
                        </div>
                        <div class="nutrition-row__value">
                          10% min
                        </div>
                      </div>
                      <div class="nutrition-row">
                        <div class="nutrition-row__label">
                          Crude Fat
                        </div>
                        <div class="nutrition-row__value">
                          5% min
                        </div>
                      </div>
                      <div class="nutrition-row">
                        <div class="nutrition-row__label">
                          Crude Fiber
                        </div>
                        <div class="nutrition-row__value">
                          1% max
                        </div>
                      </div>
                      <div class="nutrition-row">
                        <div class="nutrition-row__label">
                          Moisture
                        </div>
                        <div class="nutrition-row__value">
                          73% max
                        </div>
                      </div>
                    </div>
                    <div class="padding-top ingredient">
                      <b>Ingredients</b>: Ground beef, russet potatoes, eggs, carrots, peas,
                      dicalcium phosphate, calcium carbonate, salt, fish oil, sunflower oil,
                      vinegar, citric acid (preservative), taurine, choline bitartrate, zinc
                      gluconate, ferrous sulfate, vitamin E supplement, copper gluconate, manganese
                      gluconate, thiamine mononitrate (vitamin B1), selenium yeast, riboflavin
                      (vitamin B2), vitamin B12 supplement, cholecalciferol (source of vitamin D3),
                      potassium iodide
                    </div>
                  </div>
                  </div>
                  
              </div>
        )
    }

}
const diet = withRouter(dietSpec);
export default diet;