import React, {Component} from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Dogs from './dogs';

class DogPage extends Component{

    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Topbar></Topbar>
                        <Dogs></Dogs>
                    </div>
                </div>
            </div>
        );
    }
}
export default DogPage;