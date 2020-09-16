import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Breeds from './breeds';

class BreedPage extends Component{

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <Breeds></Breeds>
                    </div>
                </div>
            </div>
        );
    }
}
export default BreedPage;