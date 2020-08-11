import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Diets from './diets';

class DietPage extends Component{

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <Diets></Diets>
                    </div>
                </div>
            </div>
        );
    }
}
export default DietPage;