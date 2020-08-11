import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Ingredients from './ingredient';

class IngredientPage extends Component{

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <Ingredients></Ingredients>
                    </div>
                </div>
            </div>
        );
    }
}
export default IngredientPage;