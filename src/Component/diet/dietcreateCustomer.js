import React from 'react';
import DietChooseCustomer from './dietChooseCustomer';
import { Statistic, Form, Input, Button, Col, Row, Space, Divider, PageHeader, Select, Alert, Card, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import OverlapComponent from './OverLap';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import axios from 'axios';
import '../setting/axiosSetting';

class DietCreateCustomer extends React.Component{
    state = {
        dietName: "",
        recipeTypes: [],
        currentRecipe: {},
        recipes: {},
        ratios: [
            [75, 10, 5, 5, 4, 1],
            [60, 10, 0, 5, 4, 1],
            [40, 15, 0, 5, 4, 1],
        ],
        diet: {},
        dogId: this.props.id,
    }

    async componentDidMount() {
        try {
          let res = await this.getRecipes();
          let res2 = await this.getRecipeTypes();
        } catch (err) {
          alert(err);
        }
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

    handleInputChange = event => {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    };

    initDiet = () => {
        let diet = {};
        for (let i = 0; i < this.state.recipeTypes.length; i++) {
          let recipeType = this.state.recipeTypes[i];
          diet[recipeType.name] = [];
          diet[recipeType.name].push({
            recipe: {},
            recipeRatio: this.state.ratios[this.props.index][i],
          });
        }
        this.setState({
          diet: diet,
        })
      }
    
      handleRecipeChange = (type, value, index) => {
        if(value == 0 || value != "") {
          let i = value;
          let diet = this.state.diet;
          diet[type][0].recipe = this.state.recipes[type][i].recipe;
          this.setState({
            ...this.state,
            currentRecipe: this.state.recipes[type][i].recipe,
            diet: diet,
          });
        }
      }

      submitDiet = event => {
        console.log(this.state.name);
        let IDs = [];
        for(let i = 0; i < this.state.recipeTypes.length; i++){
          let typeName = this.state.recipeTypes[i].name;
          IDs.push(this.state.diet[typeName][0].recipe.id)
        }
        this.setState({
          recipeIDs: IDs,
          recipeRatios: this.state.ratios[this.props.index],
        });
        axios.post("http://localhost:8081/formula/create/diet", 
          {
            dietName: this.state.dietName,
            recipeIDs: this.state.recipeIDs,
            recipeRatios: this.state.recipeRatios,
          })
          .then(
            resJson => {
              if(this.state.dogId != 0){
                  console.log(resJson);
                this.updateDietToDog(resJson.data.data.id);
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
          })
      }

      updateDietToDog(dietId){
        axios.put("http://localhost:8081/mer/customer/update/dogDiet/" + this.state.dogId + '/' + dietId)
        .then(resJson => {
          window.location.replace("/dogupdate/" + this.state.dogId);
        })
        .catch(error => {
            console.log(error)
        });
      }

    render(){
        const onFinish = values => {
            console.log(this.state.name);
            for(let i = 0; i < this.state.recipeTypes.length; i++){
              let typeName = this.state.recipeTypes[i].name;
              console.log(this.state.diet);
              if(values[typeName] != undefined && values[typeName].length != 0){
                console.log(this.state.recipes[typeName][values[typeName][0]['recipe']].recipe.id);
              }
            }
          };

          let resultDisplay =
          (<OverlapComponent
  
            currentRecipe={this.state.currentRecipe}
            topDistance={300}
            diet={this.state.diet}
            types={this.state.recipeTypes}>
  
          </OverlapComponent>);

        const { Option } = Select;
        let priceIndex = this.props.index;
        
          return(
<           div class="container-fluid">
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
                    {/* <Button>Edit</Button>
                    <Button type="primary"> Submit</Button> */}
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
                                <Row span={24} gutter={[10, 0]}>
                                            <Col span={11}>
                                                {typeName}
                                                {this.state.ratios[priceIndex][index] == 0 ? <p>N/A</p> : 
                                                <Select name="recipe" id={typeName} style={{ width: '100%' }} onChange={(value) => {this.handleRecipeChange(typeName, value, index)}}>
                                                  {this.state.recipes[typeName].map((recipe) => {
                                                    return (
                                                      <Option value={recipe.index}> {recipe.recipe.name} </Option>
                                                    );
                                                  })}
                                                </Select>}
                                            </Col>
                                            <Col span={11}>
                                            <Statistic title="Ratio" value={this.state.ratios[priceIndex][index] + "%"} />
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
          );
    }

}
export default DietCreateCustomer;