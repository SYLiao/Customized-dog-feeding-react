import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Col, Row, Space, Divider, PageHeader, Option, Select, Alert } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import $ from 'jquery';
import axios from 'axios';
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
    recipesByType: {},
    dietName: "",
    recipeTypes: [],
    currentRecipe: {},
    num: 3,
  }

  async componentDidMount() {
    try {
      await this.getRecipes();
      await this.getDiet();
      await this.getRecipeTypes();
    } catch (err) {
      alert(err);
    }
  }

  handleInputChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  submitDiet = event => {
    console.log(this.state.name);
    console.log('Received values of form:', event);
    let IDs = [];
    let ratios = [];
    for (let i = 0; i < this.state.recipeTypes.length; i++) {
      let typeName = this.state.recipeTypes[i].name;
      if (event[typeName] != undefined && event[typeName].length != 0) {
        for (let j = 0; j < event[typeName].length; j++) {
          IDs.push(this.state.recipes[typeName][event[typeName][j]['recipe']].recipe.id);
          ratios.push(event[typeName][j]['ratio']);
        }
      }
    }

    fetch("http://localhost:8081/formula/update/diet/" + this.state.dietId, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dietName: this.state.dietName,
        recipeIDs: IDs,
        recipeRatios: ratios,
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
          if (resJson.resultCode >= 300) {
            return (
              <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
                closable
              />
            )
          }
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

  getDiet() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/formula/get/all_recipe_by_diet/" + this.state.dietId)
        .then(resJson => {
          let recipesByType = resJson.data.data.recipesByType;
          this.state.recipeTypes.map(type => {
            if (recipesByType[type.name] === undefined)
              recipesByType[type.name] = [];
          })
          this.setState({
            dietName: resJson.data.data.dietName,
            recipesByType: recipesByType,
          });
          resolve(resJson.data.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    })
  };

  getRecipeTypes() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/formula/get/all_recipe_type")
        .then(resJson => {
          this.setState({
            recipeTypes: resJson.data.data
          })
          this.initDiet();
          resolve(resJson.data.data)
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  getRecipes() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/formula/get/all_recipe_by_type")
        .then(resJson => {
          this.setState({
            recipes: resJson.data.data
          })
          resolve(resJson.data.data);
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  handleRecipeChange = (type, event, index) => {
    if (event.target.value != "") {
      let i = event.target.value;
      let diet = this.state.diet;
      if (diet[type].length == index) {
        diet[type].push({
          recipe: this.state.recipes[type][i].recipe,
          recipeRatio: 0,
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
      diet[type][index].recipeRatio = ratio;
      this.setState({
        ...this.state,
        diet: diet,
      });
    }
  }
  initDiet = () => {
    let diet = {};
    for (let i = 0; i < this.state.recipeTypes.length; i++) {
      let recipeType = this.state.recipeTypes[i];
      diet[recipeType.name] = [];
      let recipeInType = this.state.recipesByType[recipeType.name];
      if (recipeInType != undefined) {
        for (let j = 0; j < recipeInType.length; j++) {
          diet[recipeType.name].push({
            recipe: recipeInType[j].recipe,
            recipeRatio: recipeInType[j].recipeRatio,
          });
        }
      }
    }
    this.setState({
      ...this.state,
      diet: diet,
    })
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

    const { Option } = Select;

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={"dog" + i}>{"dog" + i}</Option>);
    }

    console.log(this.state);
    return (
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <Topbar></Topbar>
          <div class="container-fluid">
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Update Recipe"
                subTitle="view and edit saved recipe"
                extra={[
                  <Button>Edit</Button>,
                  <Button type="primary"> Submit</Button>,
                ]}
              >
              </PageHeader>
            </div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800"></h1>
            </div>

            <Form name="dynamic_form_item" onFinish={this.submitDiet}>

              <Row gutter={[8, 16]}>
                <div style={{ marginBottom: 8, marginLeft: 8, width: "100%" }}>

                  <Space direction="vertical" span={24}>
                    <Input addonBefore="Your diet's name:" defaultValue="diet's name" type="text" name="dietName"
                      value={this.state.dietName} onChange={this.handleInputChange} style={{ width: '345%' }} span={24} />
                    <Select
                      addonBefore="Your diet's name:"
                      mode="multiple"
                      style={{ width: '345%' }}
                      placeholder="Please select"
                      defaultValue={['dog1', 'dog12']}
                      onChange={() => {

                      }}
                    >
                      {children}
                    </Select>
                  </Space>
                </div>

                {/* <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Your diet's name:</span>
                  </div>
                  <input type="text" class="form-control" placeholder="diet's name" aria-label="diet's name" aria-describedby="basic-addon1"
                    name="dietName" value={this.state.dietName} onChange={this.handleInputChange} style={{ width: '30%' }} />
                </div> */}

                {[0, 1].map((count) => {
                  var recipeTypes = this.state.recipeTypes;
                  return (
                    <Col span={8}>
                      {recipeTypes.map((type, index) => {
                        let typeName = type.name;
                        if (index % 2 === count) {
                          return (
                            <Col span={24}>
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
                                      var currentTypeRecipes = this.state.recipesByType[typeName];
                                      currentTypeRecipes.map((recipe) => {
                                        add({ "recipe": recipe.index, "ratio": recipe.recipeRatio }, 0);
                                      })
                                    }
                                    return (
                                      <div class="card-body">
                                        {fields.map((field, index) => (
                                          <Row span={11} gutter={[8, 0]}>
                                            <Col span={11}>
                                              <Form.Item
                                                {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true} rules={[{ required: true, message: 'Missing recipe' }]}
                                              >
                                                <select class="custom-select" name="recipe" id={typeName} style={{ width: '100%' }} onChange={(event) => { this.handleRecipeChange(typeName, event, index) }}>
                                                  <option value=""></option>
                                                  {this.state.recipes[typeName].map((recipe) => {
                                                    return (
                                                      <option value={recipe.index}>{recipe.recipe.name}</option>
                                                    );
                                                  })}
                                                </select>
                                              </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                              <Form.Item
                                                {...field} name={[field.name, "ratio"]} fieldKey={[field.fieldKey, "ratio"]} rules={[{ required: true, message: 'Missing ratio' }]}
                                                required={true}
                                              >
                                                <input type="text" class="form-control" placeholder="ratio" aria-label="ratio" aria-describedby="basic-addon1"
                                                  name="ratio" style={{ width: '100%' }} onChange={(event) => { this.handleRatioChange(typeName, event, index) }} />
                                              </Form.Item>
                                            </Col>
                                            <Col span={1}>
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button" style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                  remove(field.name);
                                                  if (this.state.recipesByType[typeName] != undefined) {
                                                    if (field.name < this.state.recipesByType[typeName].length) {
                                                      let newRecipes = this.state.recipesByType;
                                                      newRecipes[typeName].splice(field.name);
                                                      this.setState({
                                                        recipesByType: newRecipes
                                                      });
                                                    }
                                                  }
                                                  if (field.name < this.state.diet[typeName].length) {
                                                    let newDiet = this.state.diet;
                                                    newDiet[typeName].splice(field.name);
                                                    this.setState({
                                                      diet: newDiet
                                                    });
                                                  }
                                                }
                                                }
                                              />
                                            </Col>
                                            <Col span={1}>
                                              <EyeOutlined style={{ margin: '0 8px' }}
                                                onClick={() => {

                                                  alert(Object.entries(field));
                                                  var newRecipes = this.state.recipesByType;
                                                  let targetId = newRecipes[typeName].splice(field.name)[0].recipe.id;
                                                  //window.location.replace("/recipeupdate/" + targetId);
                                                }}
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
                            </Col>
                          );
                        }
                      })}
                    </Col>
                  )
                })
                }
                <Col span={8}>
                  <Divider orientation="left">Preview</Divider>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" plain="true">Submit</Button>
              </Form.Item>
            </Form>
            {leftWindow}
          </div>
        </div>
      </div>
    );
  }
}
export default DietUpdate;