import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'antd';
import axios from 'axios';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import {Redirect} from 'react-router-dom';

class dietChoose extends Component{
    state = {
        diets: [],
        dogId: this.props.match.params.id,
        flag: 0,
    }

    componentDidMount(){
        this.getDiets();
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
            return(
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" class="d-flex flex-column">
                        <Topbar></Topbar>
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
                    </div>
                </div>
            );
        }
    }
}

export default dietChoose;