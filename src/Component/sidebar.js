import React, { Component, Location } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {

    state = {
        collapsed: false,
        current: '/dogpage',
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { location } = this.props
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
                    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" selectedKeys={[location.pathname]}>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Dog">
                            <Menu.Item key="/dogpage" icon={<DesktopOutlined />}>
                                <span>Dogs</span>
                                <Link to="/dogpage" />
                            </Menu.Item>
                            <Menu.Item key="/breedpage" icon={<DesktopOutlined />}>
                                <span>Breeds</span>
                                <Link to="/breedpage" />
                            </Menu.Item>
                        </SubMenu>
                        

                        <Menu.Item key="/dietpage" icon={<PieChartOutlined />}>
                            <span>Diets</span>
                            <Link to="/dietpage" />
                        </Menu.Item>

                        <Menu.Item key="/recipepage" icon={<PieChartOutlined />}
                        >
                            <span>Recipes</span>
                            <Link to="/recipepage" />
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/register">Register</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

            </Layout>
        )
    }
}

export default withRouter(Sidebar);