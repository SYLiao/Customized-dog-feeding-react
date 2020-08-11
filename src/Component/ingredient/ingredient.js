import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ingredients extends Component {
    state = {
        flag: 0,
        ingredients: [],
        resultCode: 0
    }

    componentDidMount() {
        this.getIngredients();
    }

    getIngredients = () => {
        fetch("http://localhost:8081/formula/get/all_ingredient", {
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
                    ingredients: resJson.data,
                    resultCode: resJson.resultCode,
                    flag: 1
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        console.log(this.state.ingredients);
        if (this.state.flag === 0) {
            return (
                <h1>test</h1>
            )
        }
        else {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All ingredients</h1>
                    <p class="mb-4">Here are all ingredients in database.</p>

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Ingredients</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Calculated ME, kcal/kg</th>
                                            <th>Calculated ME, kcal/cup</th>
                                            <th>Price</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ingredients.map(ingredient => {
                                            console.log(ingredient)
                                            return (
                                                <tr>
                                                    <td> <Link to={"/ingredientupdate/" + ingredient.ingredientId}> <div>{ingredient.dietName}</div> </Link></td>
                                                    <td>{ingredient.kcalPerKg}</td>
                                                    <td>{ingredient.kcalPerCup}</td>
                                                    <td>{ingredient.compositePrice}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Ingredients;