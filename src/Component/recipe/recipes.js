import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tabs, Table, Space, Spin, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios';
import '../setting/axiosSetting';

const { confirm } = Modal;
const { TabPane } = Tabs;

const columns = [
    {
        title: 'Name',
        dataIndex: ['recipe', 'name'],
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/recipeupdate/" + record.recipe.id}> <div>{text}</div> </Link>
            </Space>
        ),
    },
    {
        title: 'Protein Per Serve',
        dataIndex: ['recipe', 'crudeProtein'],
        sorter: {
            compare: (a, b) => a.recipe.crudeProtein - b.recipe.crudeProtein,
            multiple: 1,
        },
    },
    {
        title: 'Price',
        dataIndex: ['recipe', 'price'],
        sorter: {
            compare: (a, b) => a.recipe.price - b.recipe.price,
            multiple: 2,
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <EyeOutlined style={{ margin: '0 8px' }}
                    onClick={() => {
                        window.location.replace("/recipeupdate/" + record.recipe.id);
                    }
                    }
                />

                <DeleteOutlined style={{ margin: '0 8px' }, { color: 'red' }}
                        onClick={
                            () => {
                                confirm({
                                    title: 'Do you want to delete these items?',
                                    icon: <ExclamationCircleOutlined />,
                                    content: 'When clicked the OK button, this dialog will be closed after 1 second',
                                    onOk() {
                                        return new Promise((resolve, reject) => {
                                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                            axios.delete("http://localhost:8081/" + record.breedId)
                                                .then(resJson => {
                                                    console.log(resJson.data.data);
                                                    window.location.reload();
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                });
                                        }).catch(() => console.log('Oops errors!'));
                                    },
                                    onCancel() { },
                                });
                            }

                        }
                    />  
            </Space>
        ),
    },
];



class Recipes extends Component {
    state = {
        recipes: {},
        recipeTypes: [],
        flag: 0
    }

    async componentDidMount() {
        try {
            await this.getRecipeTypes();
            this.getRecipes();
        } catch (err) {
            alert(err);
        }
    }

    getRecipeTypes() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:8081/formula/get/all_recipe_type")
                .then(resJson => {
                    console.log(resJson.data.data);
                    this.setState({
                        recipeTypes: resJson.data.data
                    })
                    console.log(this.state);
                    resolve(resJson.data.data)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    getRecipes() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:8081/formula/get/all_recipe_by_type")
                .then(resJson => {
                    console.log(resJson.data.data);
                    this.setState({
                        recipes: resJson.data.data,
                        flag: 1
                    })
                    resolve(resJson.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    render() {
        let recipeTypes = this.state.recipeTypes;
        let recipes = this.state.recipes;
        if (this.state.flag === 0) {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All recipes</h1>
                    <p class="mb-4">Here are all recipes in database.</p>

                    <Tabs onChange={() => { }} type="card">
                        {recipeTypes.map((type, index) => {
                            var recipesData = recipes[type.name];
                            return (
                                <TabPane tab={type.name} key={index}>
                                    <Spin tip="Loading...">
                                        <Table
                                            columns={columns}
                                            dataSource={recipesData}
                                            pagination={{ position: ["bottomCenter"] }}
                                        />
                                    </Spin>
                                </TabPane>
                            )
                        }
                        )}
                    </Tabs>
                </div>
            )
        } else {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All recipes</h1>
                    <p class="mb-4">Here are all recipes in database.</p>

                    <Tabs onChange={() => { }} type="card">
                        {recipeTypes.map((type, index) => {
                            var recipesData = recipes[type.name];
                            return (
                                <TabPane tab={type.name} key={index}>
                                    <Table
                                        columns={columns}
                                        dataSource={recipesData}
                                        pagination={{ position: ["bottomCenter"] }}
                                    />
                                </TabPane>)
                        }
                        )}
                    </Tabs>
                </div>
            )
        }
    }

}
export default Recipes;