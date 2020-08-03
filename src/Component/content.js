import React, {Component} from 'react';
import Topbar from './topbar';

class Content extends Component{
    render(){
        return(
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar></Topbar>
                </div>
            </div>
        );
    }
}
export default Content;