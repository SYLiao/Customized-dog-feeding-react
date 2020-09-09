import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Col, Row, Space, Divider, PageHeader, Option, Select, Alert, Card, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import $ from 'jquery';
import OverlapComponent from './OverLap';
import axios from 'axios';
import '../setting/axiosSetting';

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
      let res = await this.getRecipes();
      let res3 = await this.getDiet();
      let res2 = await this.getRecipeTypes();
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

  submitDiet = (event) => {
    console.log(this.state.name);
    console.log('Received values of form:', event);

    let IDs = [];
    let ratios = [];
    for (let i = 0; i < this.state.recipeTypes.length; i++) {
      let typeName = this.state.recipeTypes[i].name;
      if (event[typeName] != undefined && event[typeName].length != 0) {
        for (let j = 0; j < event[typeName].length; j++) {
          console.log(event[typeName][j].recipe)
          console.log(event[typeName][j].recipe)
          IDs.push(this.state.recipes[typeName][event[typeName][j].recipe].recipe.id);
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
          console.log(resJson)
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

  handleRecipeChange = (type, value, index) => {
    console.log(value == "");
    if (value == 0 || value != "") {
      let i = value;
      console.log(i);
      let diet = this.state.diet;
      diet[type][index].recipe = this.state.recipes[type][i].recipe;
      console.log(this.state.recipes[type][i].recipe)
      this.setState({
        ...this.state,
        currentRecipe: this.state.recipes[type][i].recipe,
        diet: diet,
      });
    }
  }

  handleRatioChange = (type, value, index) => {
    if (value != "") {
      let ratio = value;
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
    let resultDisplay =
      (<OverlapComponent

        currentRecipe={this.state.currentRecipe}
        topDistance={300}
        diet={this.state.diet}
        types={this.state.recipeTypes}>

      </OverlapComponent>)

    const { Option } = Select;

    return (
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <Topbar></Topbar>
          <div class="container-fluid">
            <Form name="dynamic_form_item" onFinish={this.submitDiet}>

              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Update Diet"
                subTitle="view and edit saved recipe"
              >
                <div style={{ marginBottom: 8, marginLeft: 8, width: "100%" }}>
                  <Space direction="horizontal" span={24}>
                    <Input addonBefore="Your diet's name:" defaultValue="diet's name" type="text" name="dietName"
                      value={this.state.dietName} onChange={this.handleInputChange} span={20} />
                    <Button>Edit</Button>
                    <Button type="primary"> Submit</Button>
                  </Space>
                </div>
              </PageHeader>

              <Row gutter={[8, 16]}>
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
                              <Card title={`${typeName} recipes`} type="inner" span={24} style={{ marginTop: 8 }}>
                                <Form.List name={typeName}>
                                  {(fields, { add, remove }) => {
                                    var i = 0;
                                    if (Object.keys(this.state.recipesByType).length != 0 && this.state.recipesByType[typeName] != undefined && fields.length < this.state.recipesByType[typeName].length) {
                                      var currentTypeRecipes = this.state.recipesByType[typeName];
                                      console.log(currentTypeRecipes)
                                      currentTypeRecipes.map((recipe) => {
                                        add({ "recipe": recipe.index, "ratio": recipe.recipeRatio }, 0);
                                      })
                                    }
                                    return (
                                      <div class="card-body">
                                        {fields.map((field, fieldindex) => (
                                          <Row span={24} gutter={[10, 0]}>
                                            <Col span={11}>
                                              <Form.Item
                                                {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true} rules={[{ required: true, message: 'Missing recipe' }]}
                                              >
                                                <Select name="recipe" id={typeName} style={{ width: '100%' }} onChange={(value) => { this.handleRecipeChange(typeName, value, fieldindex) }}>                                                  <Option value=""></Option>
                                                  {this.state.recipes[typeName].map((recipe) => {
                                                    console.log(recipe)
                                                    return (
                                                      <Option value={recipe.index}> {recipe.recipe.name}</Option>
                                                    );
                                                  })}
                                                </Select>

                                              </Form.Item>
                                            </Col>
                                            <Col span={11}>
                                              <Form.Item
                                                {...field} name={[field.name, "ratio"]} fieldKey={[field.fieldKey, "ratio"]} required={true}
                                                rules={[
                                                  { required: true, message: 'Missing ratio' },
                                                  ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                      var ratioSum  = 0;
                                                      console.log(getFieldValue()[typeName]);
                                                      getFieldValue()[typeName].forEach(element => {
                                                        if (element != undefined) {
                                                          ratioSum += element.ratio;
                                                          console.log(element);
                                                          console.log(element.ratio);
                                                          console.log(ratioSum);
                                                        }
                                                      });

                                                      if (ratioSum == 100) {
                                                        return Promise.resolve();
                                                      }
                                                      return Promise.reject('Sum not equal to 100%'); 
                                                    },
                                                  }),]}
                                                validateFirst={true}
                                                validateTrigger={"onFinish"}
                                                required={true}
                                              >
                                                <InputNumber
                                                  type="text"
                                                  min={0}
                                                  max={100}
                                                  formatter={value => `${value}%`}
                                                  parser={value => value.replace('%', '')}
                                                  name="ratio"
                                                  style={{ width: '100%' }}
                                                  onChange={(value) => { this.handleRatioChange(typeName, value, fieldindex) }} />

                                              </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => {
                                                  remove(field.name);
                                                  if (field.name < this.state.recipesByType[typeName].length) {
                                                    let newRecipes = this.state.recipesByType;
                                                    newRecipes[typeName].splice(field.name, 1);
                                                    this.setState({
                                                      recipesByType: newRecipes
                                                    });
                                                  }
                                                  if (field.name < this.state.diet[typeName].length) {
                                                    let newDiet = this.state.diet;
                                                    newDiet[typeName].splice(field.name, 1);
                                                    this.setState({
                                                      diet: newDiet
                                                    });
                                                  }
                                                }
                                                }
                                              />
                                            </Col>
                                            {/* <Col span={1}>
                                              <EyeOutlined style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                  alert(Object.entries(field));
                                                  var newRecipes = this.state.recipesByType;
                                                  let targetId = newRecipes[typeName].splice(field.name)[0].recipe.id;
                                                  //window.location.replace("/recipeupdate/" + targetId);
                                                }
                                                }
                                              />
                                            </Col> */}
                                          </Row>
                                        ))}
                                        <Form.Item>
                                          <Button type="dashed" onClick={() => {
                                            add();
                                            let diet = this.state.diet;
                                            diet[typeName].push({
                                              recipe: {},
                                              recipeRatio: 0,
                                            });
                                            this.setState({
                                              ...this.state,
                                              diet: diet,
                                            });
                                          }} style={{ width: '100%' }}>
                                            <PlusOutlined /> Add field
                                      </Button>
                                        </Form.Item>
                                      </div>
                                    );
                                  }}
                                </Form.List>
                              </Card>
                            </Col>
                          );
                        }
                      })}
                    </Col>
                  )
                })
                }
                <Col span={8} style={{ marginTop: 16 }}>
                  {/* <Divider orientation="left">Preview</Divider> */}
                  {resultDisplay}
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" plain="true">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default DietUpdate;