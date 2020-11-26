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

import YourEmail from './Component/customer/YourEmail';

import DogName from "./Component/customer/DogName";
import Gender from './Component/customer/gender';
import Birthday from './Component/customer/Birthday';
import Spayed from './Component/customer/Spayed';
import Breed from './Component/customer/Breed';
import Weight from './Component/customer/Weight';
import ActiveLevel from './Component/customer/ActiveLevel';
import HealthCondition from './Component/customer/HealthCondition'
import Allergen from './Component/customer/Allergen'

import test2 from './Component/customer/testpage';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import allergen from './Component/customer/Allergen';


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

            <Route path="/customer/page1" exact component={YourEmail}></Route>

            <Route path="/customer/page2/dog" exact component={DogName}></Route>
            <Route path="/customer/page2/gender" exact component={Gender}></Route>
            <Route path="/customer/page2/birthday" exact component={Birthday}></Route>
            <Route path="/customer/page2/spayed" exact component={Spayed}></Route>
            <Route path="/customer/page2/breed" exact component={Breed}></Route>
            <Route path="/customer/page2/weight" exact component={Weight}></Route>
            <Route path="/customer/page2/activeLevel" exact component={ActiveLevel}></Route>
            <Route path="/customer/page2/healthCondition" exact component={HealthCondition}></Route>
            <Route path="/customer/page2/allergen" exact component={Allergen}></Route>

            <Route path="/not-found" exact component={NotFound}></Route>

            <Route path="/test" exact component={test2}></Route>

            <Redirect to ="/not-found" />
          </Switch>
      </React.Fragment>
    );
  }
  
}

export default App;
