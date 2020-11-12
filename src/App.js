import React, {Component} from 'react';
import './App.css';
import home from './Component/home';
import Login from './Component/login';
import Register from './Component/register';
import DogPage from './Component/dog/dogpage';
import DogCreate from './Component/dog/dogcreate';
import DogUpdate from './Component/dog/dogupdate';
import BreedPage from './Component/dog/breedpage';

import DietChoose from './Component/diet/dietChoose';
import DietChooseCustomer from './Component/diet/dietChooseCustomer';
import DietPage from './Component/diet/dietpage';
import DietCreate from './Component/diet/dietcreate';
import DietUpdate from './Component/diet/dietupdate';
import RecipePage from './Component/recipe/recipepage';
import RecipeUpdate from './Component/recipe/recipeupdate';
import IngredientPage from './Component/ingredient/ingredientpage';
import DietDiagram from './Component/diet/dietdiagram';
import DietCreateCustomer from './Component/diet/dietChooseCustomer';
import DietUpdateCustomer from './Component/diet/dietupdateCustomer';
import NotFound from './Component/notFound';

import Question1 from './Component/customer/Question1';
import Question2 from './Component/customer/Question2';
import Question3 from './Component/customer/Question3';
import Question4 from './Component/customer/Question4';

import test2 from './Component/test2';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component{

  render(){
    return (
      <React.Fragment>
        <Switch>
            <Route path="/home" exact component={home}></Route>
            <Route path="/login" exact render={props => <Login {...props}/>}></Route>
            <Route path="/register" exact render={props => <Register {...props}/>}></Route>
            <Route path="/dogpage" exact component={DogPage}></Route>
            <Route path="/breedpage" exact component={BreedPage}></Route>
            <Route path="/dogcreate" exact component={DogCreate}></Route>
            <Route path="/dogupdate/:id" exact component={DogUpdate}></Route>
            <Route path="/diet_choose/:id" exact component={DietChoose}></Route>
            <Route path="/dietpage" exact component={DietPage}></Route>
            <Route path="/dietcreate/:id" exact component={DietCreate}></Route>
            <Route path="/dietcreateCustomer/:id" exact component={DietCreateCustomer}></Route>
            <Route path="/dietupdateCustomer/:id/:dietId" exact component={DietUpdateCustomer}></Route>
            <Route path="/dietupdate/:id" exact component={DietUpdate}></Route>
            <Route path="/recipepage" exact component={RecipePage}></Route>
            <Route path="/recipeupdate/:id" exact component={RecipeUpdate}></Route>
            <Route path="/ingredientpage" exact component={IngredientPage}></Route>
            <Route path="/question1" exact component={Question1}></Route>
            <Route path="/question2" exact component={Question2}></Route>
            <Route path="/question3" exact component={Question3}></Route>
            <Route path="/question4" exact component={Question4}></Route>
            <Route path="/not-found" exact component={NotFound}></Route>

            <Route path="/test" exact component={test2}></Route>

            <Redirect to ="/not-found" />
          </Switch>
      </React.Fragment>
    );
  }
  
}

export default App;
