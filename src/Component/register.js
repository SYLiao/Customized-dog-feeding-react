import React, { Component } from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';
import * as Action from "./store/Actions";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Register extends Component{

    state = {
        username: "",
        password: "",
        password2: "",
        nickname: "",
        email: "",
        note: "",
        role: 3,
        roles: [],
        registered: 0
    }

    componentDidMount(){
        this.getRoles();
    }

    getRoles = () => {
        fetch("http://localhost:8081/user/get_all_role", {
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
                    ...this.state,
                    roles: resJson.data
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleInputChange = event => {
        this.setState({
          ...this.state,
          [event.target.name]: event.target.value
        });
      };

    handleFormSubmit = event => {
        const { login, logout } = this.props;
          if(this.state.password == this.state.password2){
            fetch("http://localhost:8081/user/register", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              email: this.state.email,
              nickName: this.state.nickname,
              note: this.state.note,
              roleId: this.state.role
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              throw res;
            })  
            .then(resJson => {
              this.setState({
                  registered: 1
              })
            })
            .catch(error => {
                console.log(error)
              this.setState({
                ...this.state,
                isSubmitting: false,
                errorMessage: error.message || error.statusText
              });
            });
          }
          else{
            alert("密码输入不一致");
          }
        };

    render(){
      console.log(this.state.registered);
        if(this.state.registered === 1){
            return (<Redirect to="/home"></Redirect>);
        }

        return(
            <div class="container">

            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                  <div class="col-lg-7">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                      </div>
                      <form class="user" onSubmit={this.handleFormSubmit}>
                        <div class="form-group row">
                          <div class="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="username"
                            name="username" onChange={this.handleInputChange} value={this.state.username} />
                          </div>
                          <div class="col-sm-6">
                            <input type="text" class="form-control form-control-user" id="exampleLastName" placeholder="nickname"
                            name="nickname" onChange={this.handleInputChange} value={this.state.nickname} />
                          </div>
                        </div>
                        <div class="form-group">
                          <input type="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address"
                          name="email" onChange={this.handleInputChange} value={this.state.email} />
                        </div>
                        <div class="form-group row">
                          <div class="col-sm-6 mb-3 mb-sm-0">
                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password"
                            name="password" onChange={this.handleInputChange} value={this.state.password} />
                          </div>
                          <div class="col-sm-6">
                            <input type="password" class="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"
                            name="password2" onChange={this.handleInputChange} value={this.state.password2} />
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-user btn-block">
                          Register Account
                        </button>
                        <hr />
                      </form>
                      <hr />
                      <div class="text-center">
                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                      </div>
                      <div class="text-center">
                        <a class="small" href="login.html">Already have an account? Login!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    token: state.AuthReducer.token,
  });

export default connect(mapStateToProps,Action)(Register);