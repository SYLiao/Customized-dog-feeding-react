import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Col, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import $ from 'jquery';
import OverlapComponent from './OverLap';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

class DietUpdate extends Component {
  state = {
    diet: {},
    recipes: {},
    dietId: this.props.match.params.id,
    recipesByType: {
      "Grains": [],
      "Fish": [],
      "Veggies&Fruits": [],
      "Functional supplements": [],
      "Protein ": [],
      "Vitamins": [],
    },
    dietName: "",
    recipeTypes: [],
    currentRecipe: {},
    num: 3,
  }

  componentDidMount() {
    var getDietPromise = new Promise(
      (resolve) => {
        resolve(this.getDiet());
      });

    var getRecipes = new Promise(
      (resolve) => {
        resolve(this.getRecipes());
      });

    getDietPromise.then(getRecipes.then(this.getRecipeTypes()));
  }

  handleInputChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  submitDiet = event => {
    event.preventDefault();
    fetch("http://localhost:8081/formula/update/diet/" + this.state.dietId, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dietName: this.state.name,
        recipes: this.state.recipes,
        recipeRatios: this.state.recipeRatios,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(
        resJson => {
          console.log(resJson)
        })
      .catch(error => {
        console.log(error)
        this.setState({
          ...this.state,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  getDiet = () => {
    fetch("http://localhost:8081/formula/get/all_recipe_by_diet/" + this.state.dietId, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        var recipesByType = resJson.data.recipesByType;
        this.state.recipeTypes.map(type => {
          if (recipesByType[type.name] === undefined)
            recipesByType[type.name] = [];
        })

        this.setState({
          dietName: resJson.data.dietName,
          recipesByType: recipesByType,
        });
      })
      .catch(error => {
        console.log(error)
      });
  };

  getRecipeTypes = () => {
    fetch("http://localhost:8081/formula/get/all_recipe_type", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        this.setState({
          recipeTypes: resJson.data
        })
        // this.initDiet();
      })
      .catch(error => {
        console.log(error)
      });
  }

  getRecipes = () => {
    fetch("http://localhost:8081/formula/get/all_recipe_by_type", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        this.setState({
          recipes: resJson.data
        })
      })
      .catch(error => {
        console.log(error)
      });
    console.log(this.state);
  }

  handleRecipeChange = (type, event, index) => {
    if (event.target.value != "") {
      let i = event.target.value;
      let diet = this.state.diet;
      if (diet[type].length == index) {
        diet[type].push({
          recipe: this.state.recipes[type][i].recipe,
          ratio: 0,
        });
      }
      else {
        diet[type][index].recipe = this.state.recipes[type][i].recipe;
      }
      this.setState({
        ...this.state,
        currentRecipe: this.state.recipes[type][i].recipe,
        diet: diet,
      });
    }
  }

  handleRatioChange = (type, event, index) => {
    if (event.target.value != "") {
      let ratio = event.target.value;
      let diet = this.state.diet;
      diet[type][index].ratio = ratio;
      this.setState({
        ...this.state,
        diet: diet,
      });
    }
  }

  render() {
    const onFinish = values => {
      console.log(this.state.name);
      console.log('Received values of form:', values);
    };
    let leftWindow = <OverlapComponent topDistance={140} diet={this.state.diet} types={this.state.recipeTypes}>
      <div>
        <div>
          <span>{this.state.currentRecipe.name}</span>
        </div>
        <div>
          <span>{this.state.currentRecipe.moisture}</span>
        </div>
        <div>
          <span>{this.state.currentRecipe.price}</span>
        </div>
      </div>
    </OverlapComponent>;

    console.log(this.state);
    return (
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Topbar></Topbar>
            <div class="container-fluid">
              <div>
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Create Recipe</h1>
                </div>
                <Form name="dynamic_form_item" onFinish={onFinish}>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">Your diet's name:</span>
                    </div>
                    <input type="text" class="form-control" placeholder="diet's name" aria-label="diet's name" aria-describedby="basic-addon1"
                      name="dietName" value={this.state.dietName} onChange={this.handleInputChange} style={{ width: '30%' }} />
                  </div>

                  <Row>
                    {this.state.recipeTypes.map((type, index) => {
                      let typeName = type.name;
                      return (
                        <div class="col-xl-3 col-md-6 mb-4">
                          <div class="card">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h5 class="m-0 font-weight-bold text-primary">{typeName} recipes</h5>
                              <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                              </div>
                            </div>
                            <Form.List name={typeName}>
                              {(fields, { add, remove }) => {
                                var i = 0;
                                if (Object.keys(this.state.recipesByType).length != 0 && this.state.recipesByType[typeName] != undefined && fields.length < this.state.recipesByType[typeName].length) {
                                  console.log(this.state.recipesByType[typeName]);
                                  //var currentIndex = this.state.recipesByType[typeName][i].index;
                                  //var currentRatio = this.state.recipesByType[typeName][i].recipeRatio;
                                  var currentTypeRecipes = this.state.recipesByType[typeName];
                                  currentTypeRecipes.map((recipe) => {
                                    add({ "recipe": recipe.index, "recipe's ratio": recipe.recipeRatio }, 0);
                                  })
                                }
                                return (
                                  <div class="card-body">
                                    {fields.map((field, index) => (
                                      <Row gutter={[8, 8]}>
                                        <Col span={11}>
                                          <Form.Item
                                            {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true}
                                          >
                                            <select class="custom-select" name="recipe" id={typeName} style={{ width: '100%' }} >
                                              <option value=""></option>
                                              {this.state.recipes[typeName].map((recipe) => {
                                                return (
                                                  <option value={recipe.index}>{recipe.recipe.name}</option>
                                                );
                                              })}
                                            </select>
                                          </Form.Item>
                                        </Col>
                                        <Col span={11}>
                                          <Form.Item
                                            {...field} name={[field.name, "recipe's ratio"]} fieldKey={[field.fieldKey, "recipe's ratio"]}
                                            required={true}
                                          >
                                            <input type="text" class="form-control" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                                              name="name" style={{ width: '100%' }} />
                                          </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                          <MinusCircleOutlined
                                            className="dynamic-delete-button" style={{ margin: '0 8px' }}
                                            onClick={() => {
                                              remove(field.name);
                                              if (field.name < this.state.recipesByType[typeName].length) {
                                                let newRecipes = this.state.recipesByType;
                                                newRecipes[typeName].splice(field.name);
                                                this.setState({
                                                  recipesByType: newRecipes
                                                });
                                              }
                                            }
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    ))}
                                    <Form.Item>
                                      <Button type="dashed" onClick={() => { add(); }} style={{ width: '100%' }}>
                                        <PlusOutlined /> Add field
                                    </Button>
                                    </Form.Item>
                                  </div>
                                );
                              }}
                            </Form.List>
                          </div>
                        </div>
                      );
                    })}
                  </Row>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
                {leftWindow}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DietUpdate;