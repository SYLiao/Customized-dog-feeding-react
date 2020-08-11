import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';

class DietUpdate extends Component {
  state = {
    dietId: this.props.match.params.id,
    dietName: "",
    recipes: [],
    recipeTypes: [],
    recipe_dict: {},
    age: "0",
    activeLevel: "1",
    bodyCondition: "1",
    lifePhase: "1",
    weight: ""
  }

  componentDidMount() {
    this.getDiet();
    this.getRecipe();
    this.getRecipeTypes();
  }

  handleInputChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    console.log(this.state)
  };

  getDiet = () => {
    fetch("http://localhost:8081/formula/get/diet/" + this.state.dietId, {
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
        console.log(resJson)
        var recipe_dict = new Map();        
        console.log();
        this.state.recipeTypes.forEach(recipe_type => {
          recipe_dict[recipe_type.id] = [];
        })

        resJson.data.recipes.forEach(recipe => {
          var recipeTypeId = recipe.recipeType.id;
          recipe_dict[recipeTypeId].push(recipe);
        });

        this.setState({
          dietName: resJson.data.dietName,
          name: resJson.data.recipeName,
          recipe_dict: recipe_dict,
          compositePrice: resJson.data.compositePrice,
          kcalPerKg: resJson.data.kcalPerKg,
          kcalPerCup: resJson.data.kcalPerCup,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  submitDiet = event => {
    event.preventDefault();
    fetch("http://localhost:8081/formula/update/diet" + this.state.dietId, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipeName: this.state.recipeName,
        age: this.state.age,
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

  getRecipe = () => {
    fetch("http://localhost:8081/formula/get/all_recipe", {
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
        console.log(resJson)
        this.setState({
          recipes: resJson.data
        })
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
        console.log(resJson)
        this.setState({
          recipeTypes: resJson.data
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Topbar></Topbar>
            <form onSubmit={this.submitDiet}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Your diet's name:</span>
                </div>
                <input type="text" class="form-control" placeholder="diet's name" aria-label="Username" aria-describedby="basic-addon1"
                  name="name" id="name" value={this.state.dietName} onChange={this.handleInputChange} />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Your diet's age:</span>
                </div>
                <input type="text" class="form-control" placeholder="diet's name" aria-label="Username" aria-describedby="basic-addon1"
                  name="age" id="age" value={this.state.age} onChange={this.handleInputChange} />
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">diet's gender:</label>
                </div>
                <select class="custom-select" name="gender" id="inputGroupSelect01" value={this.state.gender} onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <label for="basic-url">Your diet's Recipe</label>

              <ul>
                {this.state.recipe_dict.forEach((value, index) => {
                  return (
                    <div class="card shadow mb-4">
                      <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
                        <h6 class="m-0 font-weight-bold text-primary">{value.name}</h6>
                      </a>
                      <div class="collapse show" id="collapseCardExample" >
                        <div class="card-body">
                          This is a collapsable card example using Bootstrap's built in collapse functionality. <strong>Click on the card header</strong> to see the card body collapse and expand!
                        </div>
                      </div>

                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="inputGroupSelect01">diet's recipe:</label>
                        </div>
                        <select class="custom-select" name="recipeName" id="recipeName" onChange={this.handleInputChange}>
                          {this.state.recipes.map(recipe => {
                            return (
                              <option value={recipe.name}>{recipe.name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  )
                })}


              </ul>

              <label for="basic-url">Your diet's life</label>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">active level:</label>
                </div>
                <select class="custom-select" name="activeLevel" id="inputGroupSelect01" value={this.state.activeLevel} onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                  <option value="1">Sport/Working diets</option>
                  <option value="2">Active</option>
                  <option value="3">Moderate Active</option>
                  <option value="4">Inactive/Lethargic</option>
                </select>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">life phase:</label>
                </div>
                <select class="custom-select" name="lifePhase" id="inputGroupSelect01" value={this.state.lifePhase} onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                  <option value="1">Pregnant</option>
                  <option value="2">Nursing/Lactating</option>
                  <option value="3">Spayed</option>
                  <option value="4">Neutered</option>
                  <option value="5">Not Neutered</option>
                </select>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">body condition:</label>
                </div>
                <select class="custom-select" name="bodyCondition" id="inputGroupSelect01" value={this.state.bodyCondition} onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                  <option value="1">Grossly obesity (>45%)</option>
                  <option value="2">Overweight (15-45%)</option>
                  <option value="3">Ideal Body Condition</option>
                  <option value="4">Thin (-10-40%)</option>
                  <option value="5">Emaciated lean (-> 40%)</option>
                </select>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Your diet's weight:</span>
                </div>
                <input type="text" class="form-control" placeholder="diet's weight" aria-label="Username" aria-describedby="basic-addon1"
                  name="weight" id="weight" value={this.state.weight} onChange={this.handleInputChange} />
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Notes:</span>
                </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
              </div>

              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default DietUpdate;