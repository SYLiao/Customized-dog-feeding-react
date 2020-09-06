import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Col, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import $, { map } from 'jquery';
import OverlapComponent from './OverLap';
import "antd/dist/antd.css";


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

class DietCreate extends Component {
  state = {
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
    isMouseOn: false,
    currentRecipe: {},
  }

  componentDidMount() {
    this.getDiet();
    this.getRecipeTypes();
    this.getRecipes();
  }

  onMouseOver = () => {
    this.setState({ isMouseOn: true });
    console.log("1234");
  }

  onMouseOut = () => {
    this.setState({ isMouseOn: false });
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
  }

  handleRecipeChange = (type, event) => {
    let index = event.target.value.split(',')[1];
    this.setState({
      ...this.state,
      currentRecipe: this.state.recipes[type][index],
    });
  }

  renderSavedRecipes = (recipeTypeName) => {
    var savedRecipesOfSpecificType = this.state.recipesByType[recipeTypeName];
    // if (savedRecipesOfSpecificType === undefined) {
    //   savedRecipesOfSpecificType = {
    //     "Grains": [],
    //     "Fish": [],
    //     "Veggies&Fruits": [],
    //     "Functional supplements": [],
    //     "Protein ": [],
    //     "Vitamins": [],
    //   }
    // }
    let i = -1;
    const savedRecipesFormItem = savedRecipesOfSpecificType.map((field, index) => (
      <Col span={36}>
        <Form.Item>
          <Row gutter={[8, 8]}>
            <Col span={11}>
              <Form.Item
                {...field} //name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true}
              >
                <select class="custom-select" name="recipe" id={recipeTypeName + index} value={[field.recipe.id]} style={{ width: '100%' }} onChange={(event) => { this.handleRecipeChange(recipeTypeName, event) }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                  <option value="">Please select</option>
                  {this.state.recipes[recipeTypeName].map(recipe => {
                    i += 1;
                    return (
                      //<option value={[recipe.id, i]}>{recipe.name}</option>
                      <option value={[recipe.id]}>{recipe.name}</option>
                    );
                  })}
                </select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                {...field} //validateTrigger={['onChange', 'onBlur']} name={[field.name, "recipe's ratio"]} fieldKey={[field.fieldKey, "recipe's ratio"]}
                required={true}
              >
                <input type="text" class="form-control" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                  name="name" style={{ width: '100%' }} value={field.recipeRatio} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => {
                  //remove(field.name);
                }}
              />
            </Col>
          </Row>
        </Form.Item>
      </Col>
    ))
    return savedRecipesFormItem;
  }


  render() {
    const onFinish = values => {
      console.log(this.state.name);
      console.log('Received values of form:', values);
    };
    let leftWindow = <OverlapComponent topDistance={140}>
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

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Your diet's name:</span>
                  </div>
                  <input type="text" class="form-control" placeholder="diet's name" aria-label="diet's name" aria-describedby="basic-addon1"
                    name="name" value={this.state.dietName} onChange={this.handleInputChange} style={{ width: '30%' }} />
                </div>

                <Form name="dynamic_form_item" onFinish={onFinish}>
                  <div class="row">
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
                                let i = -1;
                                return (
                                  <div class="card-body">
                                    {this.renderSavedRecipes(typeName)}
                                    {fields.map((field, index) => (
                                      <Form.Item>
                                        <Row gutter={[8, 8]}>
                                          <Col span={11}>
                                            <Form.Item
                                              {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true}
                                            >
                                              <select class="custom-select" name="recipe" id={typeName} style={{ width: '100%' }} onChange={(event) => { this.handleRecipeChange(typeName, event) }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                                                <option value="">Please select</option>
                                                {this.state.recipes[typeName].map(recipe => {
                                                  i += 1;
                                                  return (
                                                    <option value={[recipe.id, i]}>{recipe.name}</option>
                                                  );
                                                })}
                                              </select>
                                            </Form.Item>
                                          </Col>
                                          <Col span={11}>
                                            <Form.Item
                                              {...field} validateTrigger={['onChange', 'onBlur']} name={[field.name, "recipe's ratio"]} fieldKey={[field.fieldKey, "recipe's ratio"]}
                                              required={true}
                                            >
                                              <input type="text" class="form-control" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                                                name="name" style={{ width: '100%' }} />
                                            </Form.Item>
                                          </Col>
                                          <Col span={2}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => {
                                                remove(field.name);
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                      </Form.Item>
                                    ))}

                                    <Row gutter={[8, 8]}>
                                      <Col span={24}>
                                        <Form.Item>
                                          <Button type="dashed" onClick={() => { add(); }} style={{ width: "100%" }}>
                                            <PlusOutlined /> Add field
                                        </Button>
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </div>
                                );
                              }}
                            </Form.List>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
                {/* <span onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>test</span> */}
                {leftWindow}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default DietCreate;