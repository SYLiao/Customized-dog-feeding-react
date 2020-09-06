import React, {Component} from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import * as Action from "../store/Actions";
import axios from 'axios';
import '../setting/axiosSetting';

class Dogs extends Component{
    state = {
        flag: 0,
        dogs: [],
        resultCode: 0
    }

    componentDidMount(){
        this.getDogs();
    }

    getDogs = () => {
        axios.get("http://localhost:8081/user/get_dogs")
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    dogs: resJson.data.data,
                    resultCode: resJson.data.resultCode,
                    flag: 1
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render(){
        console.log(this.state.dogs);
        if(this.state.flag == 0){
            return(
                <h1>test</h1>
            )
        }
        else{
            return(
            <div class="container-fluid"> 
                <h1 class="h3 mb-2 text-gray-800">All dogs</h1>
                <p class="mb-4">Here are all dogs in database.</p>

                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                    </div>
                    <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>age</th>
                            <th>feedingFrequency</th>
                            <th>gender</th>
                            <th>merModelEveryDay</th>
                            <th>treatFrequency</th>
                            <th>weight</th>
                            <th>breed</th>
                            <th><Link to="/dogcreate">create new dog</Link></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dogs.map(dog => {
                                console.log(dog)
                                return(
                                    <tr>
                                    <td> <Link to={"/dogupdate/" + dog.dogId}> <div>{dog.name}</div> </Link></td>
                                    <td>{dog.age}</td>
                                    <td>{dog.feedingFrequency}</td>
                                    <td>{dog.gender}</td>
                                    <td>{dog.merModelEveryDay}</td>
                                    <td>{dog.treatFrequency}</td>
                                    <td>{dog.weight}</td>
                                    <td>{dog.breedName}</td>
                                    <td></td>
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
const mapStateToProps = state => ({
    isAuth: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    token: state.AuthReducer.token,
  });

export default connect(mapStateToProps,Action)(Dogs);