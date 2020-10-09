import React, { Component } from 'react';
import { Button } from 'antd';
import Header from './header';
import axios from 'axios';
// import '../../setting/axiosSetting';

class You extends Component {
    state = {
        name: "",
        email: "",
    }

    handleNameChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    continue = () => {
        localStorage.user_traits = {
            email: this.state.email,
            name: this.state.name
        }
        axios.post("http://localhost:8081/redis/putcache/" + this.state.name,{
            age: 100,
            breedName: "string",
            feedingFrequency: "string",
            gender: "string",
            questionCache: 0,
            treatFrequency: "string",
            weight: 0
        })
            .then(resJson => {
                console.log(1);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        let emailShow = "";
        let nameShow = "";
        let buttonShow = "";
        if(this.state.name !== ""){
            nameShow = "Nice to meet you, " + this.state.name + "!";
            emailShow = (
                <div class="you__info__inputs__input">
                                    <div class="Question">What's your email?</div>
                                    <center><input class="questionInput" type="email" name="email" value={this.state.email} onChange={this.handleNameChange}/></center>
                                        <div class="greet">
                                            <div class="greet__img">
                                            </div>
                                            <div class="greet__text">
                                                <center>
                                                We ask for your email in case you want to save your progress and come back later.
                                                </center>
                                            </div>
                                        </div>
                                    </div>
            );
            if(reg.test(this.state.email)){
                buttonShow = (
                    <div class="button-container">
                        <div class="button  false false">
                            <div class="button__text"><center><Button onClick={this.continue}>Continue</Button></center></div>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div class="step you">
                <Header></Header>
                <div class="you_info">
                    <div class="title" >Tell us about yourself</div>
                    <div class="you__info__inputs">
                        <div class="you__info__inputs__input">
                            <div class="Question">What's your first name?</div>
                                <center><input class="questionInput" type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/></center>
                                <div class="greet"><div class="greet__img"></div>
                                <div class="greet__text"><center>{nameShow}</center></div>
                                </div>
                            </div>
                        </div>
                        {emailShow}
                        {buttonShow}
                    </div>
                </div>
                    );
                }
            }
export default You;