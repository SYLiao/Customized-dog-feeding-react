import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';

class IngredientUpdate extends Component{
    state = {
        ingredientId: this.props.match.params.id,
        breeds: [],
        name: "",
        gender: "male",
        age: "0",
        breedName: "",
        activeLevel: "1",
        bodyCondition: "1",
        lifePhase: "1",
        weight: ""
    }

    componentDidMount(){
        this.getIngredient();
        this.getBreeds();
    }

    handleInputChange = event => {
        this.setState({
          ...this.state,
          [event.target.name]: event.target.value
        });
        console.log(this.state)
    };

    getIngredient = () =>{
        fetch("http://localhost:8081/formula/get/all_ingredient/" + this.state.ingredientId, {
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
                    name: resJson.data.name,
                    gender: resJson.data.gender,
                    age: resJson.data.age,
                    breedName: resJson.data.breedName,
                    activeLevel: resJson.data.activeLevelId,
                    bodyCondition: resJson.data.bodyConditionId,
                    lifePhase: resJson.data.lifePhaseId,
                    weight: resJson.data.weight
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    submitIngredient = event => {
        event.preventDefault();
        fetch("http://localhost:8081/formula/update/ingredient" + this.state.ingredientId, {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            breedName: this.state.breedName,
            age: this.state.age,
            gender: this.state.gender,
            lifePhaseId: this.state.lifePhase,
            activeLevelId: this.state.activeLevel,
            bodyConditionId: this.state.bodyCondition,
            weight: this.state.weight
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

    getBreeds = () => {
        fetch("http://localhost:8081/mer/customer/get/all_breed", {
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
                    breeds: resJson.data
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <form onSubmit={this.submitIngredient}>
                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Your ingredient's name:</span>
                            </div>
                            <input type="text" class="form-control" placeholder="ingredient's name" aria-label="Username" aria-describedby="basic-addon1"
                            name="name" id="name" value={this.state.name} onChange={this.handleInputChange}/>
                            </div>

                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">ingredient's breed:</label>
                            </div>
                            <select class="custom-select" name="breedName" id="breedName" onChange={this.handleInputChange}>
                                {this.state.breeds.map(breed => {
                                    return(
                                        <option value={breed.breedName}>{breed.breedName}</option>
                                    );
                                })}
                            </select>
                            </div>

                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Your ingredient's age:</span>
                            </div>
                            <input type="text" class="form-control" placeholder="ingredient's name" aria-label="Username" aria-describedby="basic-addon1"
                            name="age" id="age" value={this.state.age} onChange={this.handleInputChange}/>
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">ingredient's gender:</label>
                            </div>
                            <select class="custom-select" name="gender" id="inputGroupSelect01" value={this.state.gender} onChange={this.handleInputChange}>
                                <option selected>Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            </div>

                            <label for="basic-url">Your ingredient's life</label>

                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">active level:</label>
                            </div>
                            <select class="custom-select" name="activeLevel" id="inputGroupSelect01" value={this.state.activeLevel} onChange={this.handleInputChange}>
                                <option selected>Choose...</option>
                                <option value="1">Sport/Working ingredients</option>
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
                                <span class="input-group-text" id="basic-addon1">Your ingredient's weight:</span>
                            </div>
                            <input type="text" class="form-control" placeholder="ingredient's weight" aria-label="Username" aria-describedby="basic-addon1"
                            name="weight" id="weight" value={this.state.weight} onChange={this.handleInputChange}/>
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
export default IngredientUpdate;