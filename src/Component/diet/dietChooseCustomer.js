import React from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Tabs } from 'antd';
import DietcreateCustomer from './dietcreateCustomer';

const { TabPane } = Tabs;

class DietChooseCustomer extends React.Component {
    state = {
        diets: [],
        dogId: this.props.match.params.id,
        userDiet: [],
    }

    render(){
        return(
            <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" class="d-flex flex-column">
                        <Topbar></Topbar>
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab="价格 1" key="1">
                                    <DietcreateCustomer index={0} id={this.props.match.params.id} ></DietcreateCustomer>
                                </TabPane>
                                <TabPane tab="价格 2" key="2">
                                    <DietcreateCustomer index={1} id={this.props.match.params.id} ></DietcreateCustomer>
                                </TabPane>
                                <TabPane tab="价格 3" key="3">
                                    <DietcreateCustomer index={2} id={this.props.match.params.id} ></DietcreateCustomer>
                                </TabPane>
                            </Tabs>
                    </div>
            </div>
        );
    }
}
export default DietChooseCustomer;