import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Recipes from './recipes';

class DietPage extends Component{

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <Recipes></Recipes>
                    </div>
                </div>
            </div>
        );
    }
}
export default DietPage;