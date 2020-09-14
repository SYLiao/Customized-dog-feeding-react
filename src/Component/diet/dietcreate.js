import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import $ from 'jquery';
import OverlapComponent from './OverLap';
import axios from 'axios';
import '../setting/axiosSetting';
import { Redirect } from 'react-router';

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

class DietCreate extends Component{
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

    componentDidMount(){
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
        for(let i = 0; i < this.state.recipeTypes.length; i++){
          let typeName = this.state.recipeTypes[i].name;
          if(event[typeName] != undefined && event[typeName].length != 0){
            for(let j = 0; j < event[typeName].length; j++){
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
    for(let i = 0; i < this.state.recipeTypes.length; i++){
      let recipeType = this.state.recipeTypes[i];
      diet[recipeType.name] = [];
    }
    this.setState({
      ...this.state,
      diet: diet,
    })
  }

  handleRecipeChange = (type, event, index) => {
    if(event.target.value != ""){
      let i = event.target.value;
      let diet = this.state.diet;
      diet[type][index].recipe = this.state.recipes[type][i].recipe;
      this.setState({
        ...this.state,
        currentRecipe: this.state.recipes[type][i].recipe,
        diet: diet,
      });
    }
  }

  handleRatioChange = (type, event, index) => {
    if(event.target.value != ""){
      let ratio = event.target.value;
      let diet = this.state.diet;
      diet[type][index].recipeRatio = ratio;
      this.setState({
        ...this.state,
        diet: diet,
      });
    }
  }

    render(){
      
        const onFinish = values => {
          console.log(this.state.name);
          for(let i = 0; i < this.state.recipeTypes.length; i++){
            let typeName = this.state.recipeTypes[i].name;
            console.log(typeName);
            if(values[typeName] != undefined && values[typeName].length != 0){
              console.log(this.state.recipes[typeName][values[typeName][0]['recipe']].recipe.id);
            }
          }
        };
         let leftWindow = <OverlapComponent topDistance={300} diet={this.state.diet} types={this.state.recipeTypes}>
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
          </OverlapComponent> ;
      
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <div>
                          <h3>recipe</h3>
                          {/* <span onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>test</span> */}
                          <Form name="dynamic_form_item" onFinish={this.submitDiet}>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                  <span className="input-group-text" id="basic-addon1">Your diet's name:</span>
                              </div>
                              <input type="text" className="form-control" placeholder="diet's name" aria-label="diet's name" aria-describedby="basic-addon1"
                              name="name" value={this.state.id} onChange={this.handleInputChange} style={{ width: '30%' }}/>
                            </div>
                            {this.state.recipeTypes.map((type, index1) => {
                              let typeName = type.name;
                              return(
                                <div key={index1}>
                                <h3>{typeName} recipes</h3>
                                <Form.List name={typeName}>
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Row span={11} gutter={[8, 0]}>
                                          <Col span={10}>
                                          <Form.Item
                                            {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true}
                                          >
                                            <select className="custom-select" name="recipe" id={typeName} style={{ width: '30%' }} onChange={(event) => {this.handleRecipeChange(typeName, event, index)}}>
                                                <option value=""></option>
                                                {this.state.recipes[typeName].map((recipe, index) => {
                                                    return(
                                                        <option value={recipe.index} key={index}>{recipe.recipe.name}</option>
                                                    );
                                                })}
                                            </select>
                                          </Form.Item>
                                          </Col>
                                          <Col span={10}>
                                          <Form.Item
                                            {...field} validateTrigger={['onChange', 'onBlur']} name={[field.name, "ratio"]} fieldKey={[field.fieldKey, "ratio"]}
                                            required={true}
                                          >
                                            <input type="text" className="form-control" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                                              name="name" style={{ width: '30%' }} onChange={(event) => {this.handleRatioChange(typeName, event, index)}}/>
                                          </Form.Item>
                                          </Col>
                                          <Col span={1}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button" style={{ margin: '0 8px' }}
                                              onClick={() => {
                                                remove(field.name);
                                                let newDiet = this.state.diet;
                                                  console.log(newDiet);
                                                  console.log(field.name);
                                                  newDiet[typeName].splice(field.name, 1);
                                                  console.log(newDiet);
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
                                        }} style={{ width: '60%' }}>
                                          <PlusOutlined /> Add field
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  );
                                }}
                              </Form.List>
                              </div>
                              );
                            })}
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                          </Form>
                          {leftWindow}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DietCreate;