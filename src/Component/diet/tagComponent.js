import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button } from 'antd';
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

class DietUpdate extends Component{
    state = {
        diet: {},
        dietId: this.props.match.params.id,
        recipesByType: {
          "fish": [],
          "protein": [],
        },
        dietName: "",
        recipeTypes: ["fish", "protein"],
        currentRecipe: {},
        num:3,
    }

    componentDidMount(){
        this.getDiet();
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
            var recipeType = resJson.data.recipesByType;
            let recipesByType = this.state.recipesByType;
            recipesByType["fish"] = recipeType["fish"];
            recipesByType["protein"] = recipeType["protein"];
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

  handleRecipeChange = (type, event, index) => {
    if(event.target.value != ""){
      let i = event.target.value;
      let diet = this.state.diet;
      if(diet[type].length == index){
        diet[type].push({
          recipe: this.state.recipes[type][i].recipe,
          ratio: 0,
        });
      }
      else{
        diet[type][index].recipe = this.state.recipes[type][i].recipe;
      }
      this.setState({
        ...this.state,
        currentRecipe: this.state.recipes[type][i].recipe,
        diet: diet,
      });
    }
    console.log(this.state.diet);
  }

  handleRatioChange = (type, event, index) => {
    if(event.target.value != ""){
      let ratio = event.target.value;
      let diet = this.state.diet;
      diet[type][index].ratio = ratio;
      this.setState({
        ...this.state,
        diet: diet,
      });
    }
    console.log(this.state.diet);
  }

    render(){
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
          </OverlapComponent> ;
      
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <div>
                          <h3>recipe</h3>
                          {/* <span onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>test</span> */}
                          <Form name="dynamic_form_item" onFinish={onFinish}>
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon1">Your diet's name:</span>
                              </div>
                              <input type="text" class="form-control" placeholder="diet's name" aria-label="diet's name" aria-describedby="basic-addon1"
                              name="name" value={this.state.id} onChange={this.handleInputChange} style={{ width: '30%' }}/>
                            </div>
                            {this.state.recipeTypes.map((type, index) => {
                              let typeName = type.name;
                              return(
                                <div>
                                <h3>{typeName} recipes</h3>
                                <Form.List name={typeName}>
                                {(fields, { add, remove }) => {
                                  console.log(Object.keys(this.state.recipes).length);
                                  if(Object.keys(this.state.recipes).length != 0 && fields.length < this.state.recipes[typeName].length){
                                    console.log(1);
                                    add();
                                  }
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Form.Item>
                                          <Form.Item
                                            {...field} name={[field.name, 'recipe']} fieldKey={[field.fieldKey, 'recipe']} required={true}
                                          >
                                            <select class="custom-select" name="recipe" id={typeName} style={{ width: '30%' }} onChange={(event) => {this.handleRecipeChange(typeName, event, index)}}>
                                                <option value=""></option>
                                                {this.state.recipes[typeName].map((recipe) => {
                                                    return(
                                                        <option value={recipe.index}>{recipe.recipe.name}</option>
                                                    );
                                                })}
                                            </select>
                                          </Form.Item>
                                          <Form.Item
                                            {...field} validateTrigger={['onChange', 'onBlur']} name={[field.name, "recipe's ratio"]} fieldKey={[field.fieldKey, "recipe's ratio"]}
                                            required={true}
                                          >
                                            <input type="text" class="form-control" placeholder="recipe's ratio" aria-label="recipe's ratio" aria-describedby="basic-addon1"
                                              name="name" style={{ width: '30%' }} onChange={(event) => {this.handleRatioChange(typeName, event, index)}}/>
                                          </Form.Item>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button" style={{ margin: '0 8px' }}
                                              onClick={() => {
                                                remove(field.name);
                                              }}
                                            />
                                        </Form.Item>
                                      ))}
                                      <Form.Item>
                                        <Button type="dashed" onClick={() => { add(); }} style={{ width: '60%' }}>
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
export default DietUpdate;