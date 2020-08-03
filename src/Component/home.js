import React, {Component} from 'react';
import Sidebar from './sidebar';
import Content from './content';

class Home extends Component{
    render(){
        return(
            <div id="wrapper">
                <Sidebar></Sidebar>
                <Content></Content>
            </div>
        );
    }
}

export default Home;