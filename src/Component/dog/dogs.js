import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
        fetch("http://localhost:8081/mer/customer/get/all_dog", {
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
                    dogs: resJson.data,
                    resultCode: resJson.resultCode,
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dogs.map(dog => {
                                console.log(dog)
                                return(
                                    <tr>
                                    <Link to={"/dogupdate/" + dog.dogId}>
                                    <td>{dog.name}</td>
                                    </Link>
                                    <td>{dog.age}</td>
                                    <td>{dog.feedingFrequency}</td>
                                    <td>{dog.gender}</td>
                                    <td>{dog.merModelEveryDay}</td>
                                    <td>{dog.treatFrequency}</td>
                                    <td>{dog.weight}</td>
                                    <th>{dog.breedName}</th>
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
export default Dogs;