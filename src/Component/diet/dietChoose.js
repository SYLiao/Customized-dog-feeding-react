import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'antd';
import axios from 'axios';
import '../setting/axiosSetting';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import {Redirect} from 'react-router-dom';

class dietChoose extends Component{
    state = {
        diets: [],
        dogId: this.props.match.params.id,
        userDiet: [],
        flag: 0,
    }

    componentDidMount(){
        this.getDiets();
        this.getUserDiets();
    }

    getDiets(){
        axios.get("http://localhost:8081/mer/customer/get/diet_default/")
            .then(resJson => {
                this.setState({
                    diets: resJson.data.data
                })
                console.log(this.state.diets);
            })
            .catch(error => {
                console.log(error)
            });
    }

    getUserDiets(){
        axios.get("http://localhost:8081/user/get_diet_user/")
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    userDiet: resJson.data.data,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }


    changeDiet = (dietId) => {
        axios.put("http://localhost:8081/mer/customer/update/dogDiet/" + this.state.dogId + '/' + dietId)
            .then(resJson => {
                this.setState({
                    flag: 1,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    changeUserDiet = (index) => {
        let dietId = this.state.userDiet[index].dietId;
        console.log(dietId);
        axios.put("http://localhost:8081/mer/customer/update/dogDiet/" + this.state.dogId + '/' + dietId)
            .then(resJson => {
                this.setState({
                    flag: 1,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render(){
        if(Object.keys(this.state.diets).length === 0){
            return(
                <div>
                    There is no default diets.
                </div>
            );
        }
        else{
            if(this.state.flag === 1){
                return <Redirect to={'/dogupdate/' + this.state.dogId} ></Redirect>
            }
            let userDiet = Object.assign([], this.state.userDiet);
            let userDiets = [], size = 3;
            console.log(this.state.userDiet);
            while (userDiet.length > 0){
                userDiets.push(userDiet.splice(0, size));  
            }
            console.log(this.state.userDiet);
            return(
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" class="d-flex flex-column">
                        <Topbar></Topbar>
                        <h1>默认食谱：</h1>
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                            <Col span={8}>
                                <Card title={this.state.diets[0].name} bordered={false}>
                                    <p>name: {this.state.diets[0].name}</p>
                                    <p>kcalPerCup: {this.state.diets[0].kcalPerCup}</p>
                                    <p>kcalPerKg: {this.state.diets[0].kcalPerKg}</p>
                                    <p>compositePrice: {this.state.diets[0].compositePrice}</p>
                                    <Button key="1" onClick={() => {this.changeDiet(1)}}>
                                        选择食谱
                                    </Button>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title={this.state.diets[1].name} bordered={false}>
                                    <p>name: {this.state.diets[1].name}</p>
                                    <p>kcalPerCup: {this.state.diets[1].kcalPerCup}</p>
                                    <p>kcalPerKg: {this.state.diets[1].kcalPerKg}</p>
                                    <p>compositePrice: {this.state.diets[1].compositePrice}</p>
                                    <Button key="2" onClick={() => {this.changeDiet(2)}}>
                                        选择食谱
                                    </Button>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title={this.state.diets[2].name} bordered={false}>
                                    <p>name: {this.state.diets[2].name}</p>
                                    <p>kcalPerCup: {this.state.diets[2].kcalPerCup}</p>
                                    <p>kcalPerKg: {this.state.diets[2].kcalPerKg}</p>
                                    <p>compositePrice: {this.state.diets[2].compositePrice}</p>
                                    <Button key="3" onClick={() => {this.changeDiet(3)}}>
                                        选择食谱
                                    </Button>
                                </Card>
                            </Col>
                            </Row>
                        </div>
                        <h1>您的自创食谱：</h1>
                        <div className="site-card-wrapper">
                            {userDiets.map((diets, index) => {
                                if(diets.length === 1){
                                    return(
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Card title={diets[0].dietName} bordered={false}>
                                                    <p>name: {diets[0].dietName}</p>
                                                    <p>kcalPerCup: {diets[0].kcalPerCup}</p>
                                                    <p>kcalPerKg: {diets[0].kcalPerKg}</p>
                                                    <p>compositePrice: {diets[0].compositePrice}</p>
                                                    <Button key="1" onClick={() => {this.changeUserDiet(index*3 + 0)}}>
                                                        选择食谱
                                                    </Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    );
                                }
                                else if(diets.length === 2){
                                    return(
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Card title={diets[0].dietName} bordered={false}>
                                                    <p>name: {diets[0].dietName}</p>
                                                    <p>kcalPerCup: {diets[0].kcalPerCup}</p>
                                                    <p>kcalPerKg: {diets[0].kcalPerKg}</p>
                                                    <p>compositePrice: {diets[0].compositePrice}</p>
                                                    <Button key="1" onClick={() => {this.changeUserDiet(index*3 + 0)}}>
                                                        选择食谱
                                                    </Button>
                                                </Card>
                                            </Col>
                                            <Col span={8}>
                                                <Card title={diets[1].dietName} bordered={false}>
                                                    <p>name: {diets[1].dietName}</p>
                                                    <p>kcalPerCup: {diets[1].kcalPerCup}</p>
                                                    <p>kcalPerKg: {diets[1].kcalPerKg}</p>
                                                    <p>compositePrice: {diets[1].compositePrice}</p>
                                                    <Button key="2" onClick={() => {this.changeUserDiet(index*3 + 1)}}>
                                                        选择食谱
                                                    </Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    );
                                }
                                return(
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Card title={diets[0].dietName} bordered={false}>
                                                <p>name: {diets[0].dietName}</p>
                                                <p>kcalPerCup: {diets[0].kcalPerCup}</p>
                                                <p>kcalPerKg: {diets[0].kcalPerKg}</p>
                                                <p>compositePrice: {diets[0].compositePrice}</p>
                                                <Button key="1" onClick={() => {this.changeUserDiet(index*3 + 0)}}>
                                                    选择食谱
                                                </Button>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title={diets[1].dietName} bordered={false}>
                                                <p>name: {diets[1].dietName}</p>
                                                <p>kcalPerCup: {diets[1].kcalPerCup}</p>
                                                <p>kcalPerKg: {diets[1].kcalPerKg}</p>
                                                <p>compositePrice: {diets[1].compositePrice}</p>
                                                <Button key="2" onClick={() => {this.changeUserDiet(index*3 + 1)}}>
                                                    选择食谱
                                                </Button>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title={diets[2].dietName} bordered={false}>
                                                <p>name: {diets[2].dietName}</p>
                                                <p>kcalPerCup: {diets[2].kcalPerCup}</p>
                                                <p>kcalPerKg: {diets[2].kcalPerKg}</p>
                                                <p>compositePrice: {diets[2].compositePrice}</p>
                                                <Button key="3" onClick={() => {this.changeUserDiet(index*3 + 2)}}>
                                                    选择食谱
                                                </Button>
                                            </Card>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default dietChoose;