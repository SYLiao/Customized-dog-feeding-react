import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as Action from "./store/Actions";

class Topbar extends Component{

    handleClick = () => {
        this.props.dispatch(Action.login("1",  "2"))
    }

    render(){
        let user = localStorage.getItem("user");
        return(
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <ul className="navbar-nav ml-auto">
                    {
                        user ? <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user}</span>
                            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                            </a>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/login">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                            </Link>
                        </div>
                        </li> :
                        <div>
                        <Link to="/register" className="btn btn-info btn-lg" role="button" color="inherit" aria-pressed="true">Register</Link>
                        <Link to="/login" className="btn btn-info btn-lg" role="button" color="inherit" aria-pressed="true">Login</Link>
                        </div>
                    }
                    {
                        user ? 
                        <li>
                            <Link className="dropdown-item" to="/login" onClick={this.handleClick}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </Link>
                        </li> :
                        <li>

                        </li>
                    }

                </ul>

            </nav>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    token: state.AuthReducer.token,
  });

export default connect(mapStateToProps,Action)(Topbar);