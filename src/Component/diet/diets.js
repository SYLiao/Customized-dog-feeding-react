import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../setting/axiosSetting';

class Diets extends Component {
    state = {
        flag: 0,
        diets: [],
        resultCode: 0
    }

    componentDidMount() {
        this.getDiets();
    }

    getDiets = () => {
        axios.get("http://localhost:8081/user/get_diet_user/")
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    diets: resJson.data.data,
                    resultCode: resJson.data.resultCode,
                    flag: 1
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        console.log(this.state.diets);
        if (this.state.flag === 0) {
            return (
                <h1>test</h1>
            )
        }
        else {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All diets</h1>
                    <p class="mb-4">Here are all diets in database.</p>

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Diets</h6>
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
                                        {this.state.diets.map(diet => {
                                            console.log(diet)
                                            return (
                                                <tr>
                                                    <td> <Link to={"/dietupdate/" + diet.dietId}> <div>{diet.dietName}</div> </Link></td>
                                                    <td>{diet.kcalPerKg}</td>
                                                    <td>{diet.kcalPerCup}</td>
                                                    <td>{diet.compositePrice}</td>
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
export default Diets;