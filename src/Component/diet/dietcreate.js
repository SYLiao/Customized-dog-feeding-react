import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Col, Card, Row, Space, Divider, PageHeader, Select, Alert, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import $ from 'jquery';
import OverlapComponent from './OverLap';
import axios from 'axios';
import '../setting/axiosSetting';
import { Redirect } from 'react-router';
const { Option } = Select;

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
        recipes: {},
        recipeRatios: [],
        name: "",
        recipeTypes: [],
        isMouseOn: false,
        currentRecipe: {},
        diet: {},
        recipeIDs: [],
        dogId: this.props.match.params.id,
        flag: 0
    }

    componentDidMount() {
        this.getRecipeTypes();
        this.getRecipes();
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
        this.setState({
          recipeIDs: IDs,
          recipeRatios: ratios,
        });
        axios.post("http://localhost:8081/formula/create/diet", 
          {
            dietName: this.state.name,
            recipeIDs: this.state.recipeIDs,
            recipeRatios: this.state.recipeRatios,
          })
          .then(
            resJson => {
              if(this.state.dogId != 0){
                this.updateDietToDog(resJson.data.id);
              }
              else{
                window.location.replace("/dietpage");
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

      updateDietToDog(dietId) {
        axios.put("http://localhost:8081/mer/customer/update/dogDiet/" + this.state.dogId + '/' + dietId)
        .then(resJson => {
          window.location.replace("/dogupdate/" + this.state.dogId);
        })
        .catch(error => {
            console.log(error)
        });
      }

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
                this.initDiet();
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

  initDiet = () => {
    let diet = {};
    for (let i = 0; i < this.state.recipeTypes.length; i++) {
      let recipeType = this.state.recipeTypes[i];
      diet[recipeType.name] = [];
    }
    this.setState({
      ...this.state,
      diet: diet,
    })
  }

  handleRecipeChange = (type, value, index) => {
    if (value != "") {
      let i = value;
      let diet = this.state.diet;
      diet[type][index].recipe = this.state.recipes[type][i].recipe;
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

    render() {      
        const onFinish = values => {
          console.log(this.state.name);
          for (let i = 0; i < this.state.recipeTypes.length; i++) {
            let typeName = this.state.recipeTypes[i].name;
            console.log(typeName);
            if (values[typeName] != undefined && values[typeName].length != 0) {
              console.log(this.state.recipes[typeName][values[typeName][0]['recipe']].recipe.id);
            }
          }
        };
        let resultDisplay =
        (<OverlapComponent
  
          currentRecipe={this.state.currentRecipe}
          //topDistance={300}
          diet={this.state.diet}
          types={this.state.recipeTypes}>
  
        </OverlapComponent>)
      
      return (
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar></Topbar>
              <div class="container-fluid">
                <Form name="dynamic_form_item" onFinish={this.submitDiet}>
                  <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Create Diet"
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
                  <Row gutter={[16, 16]}>
                    {[0, 1].map((count) => {
                      return (
                        <Col span={8}>
                          {
                            this.state.recipeTypes.map((type, index1) => {
                              let typeName = type.name;
                              if (index1 % 2 === count) {
                                return (
                                  <div key={index1}>
                                    <Form.List name={typeName}>
                                      {(fields, { add, remove }) => {
                                        return (
                                          <Card title={`${typeName} recipes`} type="inner" span={24} style={{ marginTop: 16 }}>
                                            <div>
                                              {fields.map((field, index) => (
                                                <Row span={24} gutter={[10, 0]}>
                                                  <Col span={11}>
                                                    <Form.Item
                                                      {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true} rules={[{ required: true, message: 'Missing recipe' }]}
                                                    >
  
                                                      <Select defaultValue="" name="recipe" id={typeName} style={{ width: '100%' }} onChange={(value) => { this.handleRecipeChange(typeName, value, index) }}>
                                                        <Option value=""></Option>
                                                        {this.state.recipes[typeName].map((recipe, index) => {
                                                          return (
                                                            <Option value={recipe.recipe.index} key={index}>{recipe.recipe.name}</Option>
                                                          );
                                                        })}
                                                      </Select>
  
                                                    </Form.Item>
                                                  </Col>
                                                  <Col span={11}>
                                                    <Form.Item
                                                      {...field} name={[field.name, "ratio"]} fieldKey={[field.fieldKey, "ratio"]} 
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
                                                        })
                                                      ]}
                                                      validateFirst={true}
                                                      validateTrigger={"onFinish"}
                                                      required={true}
                                                    >
                                                      <InputNumber
                                                        min={0}
                                                        max={100}
                                                        formatter={value => `${value}%`}
                                                        parser={value => value.replace('%', '')}
                                                        style={{ width: '100%' }}
                                                        onChange={(value) => { this.handleRatioChange(typeName, value, index) }}
                                                      />
                                                      {/*                                                     
                                                        <Input type="text" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                                                        name="name" style={{ width: '100%' }} onChange={(event) => { this.handleRatioChange(typeName, event, index) }} />
                                                      */}
                                                    </Form.Item>
                                                  </Col>
                                                  <Col span={2}>
                                                    <MinusCircleOutlined
                                                      className="dynamic-delete-button"
                                                      onClick={() => {
                                                        remove(field.name);
                                                        let newDiet = this.state.diet;
                                                        newDiet[typeName].splice(field.name, 1);
                                                        this.setState({
                                                          diet: newDiet
                                                        });
                                                      }}
  
                                                    />
                                                  </Col>
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
                                          </Card>
                                        );
                                      }}
                                    </Form.List>
                                  </div>
                                );
                              }
                            })
                          }
                        </Col>
                      )
                    })}
                    <Col span={8} style={{ marginTop: 16 }}>
                      {resultDisplay}
                    </Col>
                  </Row>
  
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
  
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default DietCreate;