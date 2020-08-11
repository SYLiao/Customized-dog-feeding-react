import React, {Component} from 'react';
import './App.css';
import home from './Component/home';
import Login from './Component/login';
import Register from './Component/register';
import DogPage from './Component/dog/dogpage';
import DogCreate from './Component/dog/dogcreate';
import DogUpdate from './Component/dog/dogupdate';
import NotFound from './Component/notFound';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component{

  render(){
    return (
      <React.Fragment>
        <Switch>
            <Route path="/home" exact component={home}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/dogpage" exact component={DogPage}></Route>
            <Route path="/dogcreate" exact component={DogCreate}></Route>
            <Route path="/dogupdate/:id" exact component={DogUpdate}></Route>
            <Route path="/not-found" exact component={NotFound}></Route>
            <Redirect to ="/not-found" />
          </Switch>
      </React.Fragment>
    );
  }
  
}

export default App;
