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
                        <Menu.Item key="/dogpage" icon={<DesktopOutlined />}>
                            <span>Dogs</span>
                            <Link to="/dogpage" />
                        </Menu.Item>

                        <Menu.Item key="/dietpage" icon={<PieChartOutlined />}>
                            <span>Dies</span>
                            <Link to="/dietpage" />
                        </Menu.Item>

                        <Menu.Item key="/recipepage" icon={<PieChartOutlined />}
                        >
                            <span>Recipes</span>
                            <Link to="/recipepage" />
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                            <li class="nav-item">

                            </li>

                            <li class="nav-item">
                                <Link class="nav-link" to="/dietpage">
                                    <i class="fas fa-fw fa-table"></i>
                                    <span>Your diets</span></Link>
                            </li>

                            <li class="nav-item">

                            </li>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />} />
                    </Menu>
                </Sider>

            </Layout>
        )
        //<div>
        {/* <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </a>

                    <hr class="sidebar-divider my-0"/>

                    <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                    </li>

                    <hr class="sidebar-divider"/>

                    <div class="sidebar-heading">
                    Interface
                    </div>

                    <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item" href="buttons.html">Buttons</a>
                        <a class="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                    </li>

                    <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <a class="collapse-item" href="utilities-color.html">Colors</a>
                        <a class="collapse-item" href="utilities-border.html">Borders</a>
                        <a class="collapse-item" href="utilities-animation.html">Animations</a>
                        <a class="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                    </li>

                    <hr class="sidebar-divider"/>

                    <div class="sidebar-heading">
                    Addons
                    </div>

                    <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Login Screens:</h6>
                        <a class="collapse-item" href="login.html">Login</a>
                        <a class="collapse-item" href="register.html">Register</a>
                        <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div class="collapse-divider"></div>
                        <h6 class="collapse-header">Other Pages:</h6>
                        <a class="collapse-item" href="404.html">404 Page</a>
                        <a class="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                    </li>

                    <li class="nav-item">
                    <a class="nav-link" href="charts.html">
                        <i class="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                    </li>

                    <li class="nav-item">
                    <Link class="nav-link" to="/dogpage">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Your dogs</span></Link>
                    </li>

                    <li class="nav-item">
                    <Link class="nav-link" to="/dietpage">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Your diets</span></Link>
                    </li>

                    <li class="nav-item">
                    <Link class="nav-link" to="/recipepage">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Your recipes</span></Link>
                    </li>

                    <hr class="sidebar-divider d-none d-md-block"/>

                    <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                    </ul> */}
        //</div>
    }
}

export default withRouter(Sidebar);