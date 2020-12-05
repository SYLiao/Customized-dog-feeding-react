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
    product: {},
    selected: 0
  }

  componentDidMount() {
    let { product, selected } = this.props;
    console.log(this.props)
    this.setState({
      product: product,
      selected: selected
    }, console.log(this.state.product))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  render() {
    var selectedProduct = {}
    if (this.state.product[this.state.selected] != undefined) {
      selectedProduct = this.state.product[this.state.selected]
    }
    return (
      <div class="diet-card d-lg-block">
        <div class="pet-overview-card__header text-center text-uppercase bg-sun">
          <div class="text-smallest color-chew-toy">
            <h2>{selectedProduct != undefined && selectedProduct.name}</h2>
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

            <div class="nutrition-section--beef">
              {
                Object.entries(selectedProduct).slice(2).map((product, index) => {
                  console.log(product)
                  return (
                    <div class="nutrition-row">
                      <div class="nutrition-row__label">
                        {product[0]}
                      </div>
                      <div class="nutrition-row__value">
                        {!Array.isArray(product[1]) && product[1]}
                        {Array.isArray(product[1]) && product[1].join()}
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div class="padding-top ingredient">
              <b>request</b>: {JSON.stringify(this.state.profile.q3)}
              {/* <b>responde</b>: {JSON.stringify(selectedProduct)} */}
            </div>
          </div>
        </div>

      </div>
    )
  }

}
const diet = withRouter(dietSpec);
export default diet; 