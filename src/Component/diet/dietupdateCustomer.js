import React from 'react';
import DietChooseCustomer from './dietChooseCustomer';
import { Statistic, Form, Input, Button, Col, Row, Space, Divider, PageHeader, Select, Alert, Card, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import OverlapComponent from './OverLap';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import axios from 'axios';
import '../setting/axiosSetting';

class DietUpdateCustomer extends React.Component{
    state = {
        dietName: "",
        recipesByType: {},
        recipeTypes: [],
        currentRecipe: {},
        recipes: {},
        ratios: [
            [75, 10, 5, 5, 4, 1],
            [60, 10, 0, 5, 4, 1],
            [40, 15, 0, 5, 4, 1],
        ],
        ratioMap: {
            75: 0,
            60: 1,
            40: 2,
        },
        diet: {},
        dogId: this.props.match.params.id,
        dietId: this.props.match.params.dietId,
    }

    async componentDidMount() {
        try {
            await this.getRecipes();
            await this.getRecipeTypes();
        } catch (err) {
          alert(err);
        }
      }

      getRecipes() {
        return new Promise((resolve, reject) => {
          axios.get("http://localhost:8081/formula/get/all_recipes_and_diet/" + this.state.dietId)
            .then(resJson => {
              let recipesByType = resJson.data.data.dietRecipeByType.recipesByType;
              this.state.recipeTypes.map(type => {
                if (recipesByType[type.name] === undefined)
                  recipesByType[type.name] = [];
              })
              console.log(resJson);
              this.setState({
                dietName: resJson.data.data.dietRecipeByType.dietName,
                recipesByType: recipesByType,
                recipes: resJson.data.data.recipesByType
              });
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
        let IDs = [];
        for(let i = 0; i < this.state.recipeTypes.length; i++){
          let typeName = this.state.recipeTypes[i].name;
          if(Object.keys(this.state.diet[typeName][0].recipe).length != 0){
            IDs.push(this.state.diet[typeName][0].recipe.id)
          }
        }
        this.setState({
          recipeIDs: IDs,
          recipeRatios: this.state.ratios[this.props.index],
        });
        axios.put("http://localhost:8081/formula/update/diet/" + this.state.dietId, 
          {
            dietName: this.state.dietName,
            recipeIDs: this.state.recipeIDs,
            recipeRatios: this.state.recipeRatios,
          })
          .then(
            resJson => {
                window.location.replace("/dogupdate/" + this.state.dogId);
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

        let priceIndex = 1;
        if(Object.keys(this.state.recipesByType).length != 0){
            priceIndex = this.state.ratioMap[this.state.recipesByType['Protein'][0].recipeRatio];
        }
        
          return(
            <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" class="d-flex flex-column">
                        <Topbar></Topbar>
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
                  <Form.Item name="name" rules={[{ required: true }]}>
                    <Input addonBefore="Your diet's name:" defaultValue="diet's name" type="text" name="dietName"
                      value={this.state.dietName} onChange={this.handleInputChange} span={20} required={true}/>
                    {/* <Button>Edit</Button>
                    <Button type="primary"> Submit</Button> */}
                    </Form.Item>
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
                                                <Form.Item
                                                name={"recipe" + typeName} required={true} rules={[{ required: true, message: 'Missing recipe' }]} 
                                              >
                                                {this.state.ratios[priceIndex][index] == 0 ? <p>N/A</p> : 
                                                <Select name={typeName} id={typeName} style={{ width: '100%' }} onChange={(value) => {this.handleRecipeChange(typeName, value, index)}} required={true} 
                                                defaultValue={this.state.recipesByType[typeName].length != 0 ? this.state.recipesByType[typeName][0].index : 0}>
                                                  {this.state.recipes[typeName].map((recipe, recipeIndex) => {
                                                          return(
                                                            <Option value={recipe.index}> {recipe.recipe.name}</Option>
                                                          );
                                                  })}
                                                </Select>}
                                                </Form.Item>
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
          </div>
          </div>
          );
    }

}
export default DietUpdateCustomer;