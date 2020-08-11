import React, {Component} from 'react';
import './App.css';
import home from './Component/home';
import Login from './Component/login';
import Register from './Component/register';
import DogPage from './Component/dog/dogpage';
import DogCreate from './Component/dog/dogcreate';
import DogUpdate from './Component/dog/dogupdate';

import DietPage from './Component/diet/dietpage';
import DietCreate from './Component/diet/dietcreate';
import DietUpdate from './Component/diet/dietupdate';
import IngredientPage from './Component/ingredient/ingredientpage';
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
            <Route path="/dietpage" exact component={DietPage}></Route>
            <Route path="/dietcreate" exact component={DietCreate}></Route>
            <Route path="/dietupdate/:id" exact component={DietUpdate}></Route>
            <Route path="/ingredientpage" exact component={IngredientPage}></Route>

          
            <Route path="/not-found" exact component={NotFound}></Route>
            <Redirect to ="/not-found" />
          </Switch>
      </React.Fragment>
    );
  }
  
}

export default App;
