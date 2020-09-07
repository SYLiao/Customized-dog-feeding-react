import React, { Component } from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';
import * as Action from "./store/Actions";
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';
import {Redirect} from 'react-router-dom';

class Login extends Component{

    state = {
        username: "",
        password: "",
        redirect: 0,
    }

    frontLogin = (type, action) => {
        this.props.dispatch(Action.login(type. action))
    }

    handleInputChange = event => {
        this.setState({
          ...this.state,
          [event.target.name]: event.target.value
        });
      };

    handleFormSubmit = event => {
        const { login, logout } = this.props;
        console.log("handleFormSubmit");
          event.preventDefault();
        //   setErrors(validate(data));  
    
          this.setState({
            ...this.state,
            isSubmitting: true,
            errorMessage: null
          });

          fetch("http://localhost:8081/user/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              throw res;
            })  
            .then(resJson => {
              console.log(resJson)
              const decoded = jwt_decode(resJson.data.token)
              login(decoded.sub, resJson.data.token);
              this.setState({
                redirect: 1
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
        };

    render(){
        let user = this.props.user;
        console.log(user);
        // if(localStorage.getItem("user") != ""){
        //     return <Redirect to="/home"></Redirect>
        // }
        if(localStorage.getItem("user") != null){
          return(
            <Redirect to="/home"></Redirect>
          );
        }

        return(
            <div class="container">
            <div class="row justify-content-center">
        
              <div class="col-xl-10 col-lg-12 col-md-9">
        
                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                      <div class="col-lg-6">
                        <div class="p-5">
                          <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                          </div>
                          <form class="user" onSubmit={this.handleFormSubmit}>
                            <div class="form-group">
                              <input type="text" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter username"
                              name="username" onChange={this.handleInputChange} value={this.state.username} />
                            </div>
                            <div class="form-group">
                              <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password"
                              name="password" onChange={this.handleInputChange} value={this.state.password} />
                            </div>
                            <div class="form-group">
                              <div class="custom-control custom-checkbox small">
                                <input type="checkbox" class="custom-control-input" id="customCheck" />
                                <label class="custom-control-label" for="customCheck">Remember Me</label>
                              </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-user btn-block">
                              Login
                            </button>
                            <hr />
                          </form>
                          <hr />
                          <div class="text-center">
                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                          </div>
                          <div class="text-center">
                            <a class="small" href="register.html">Create an Account!</a>
                          </div>
                        </div>
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

export default connect(mapStateToProps,Action)(Login);