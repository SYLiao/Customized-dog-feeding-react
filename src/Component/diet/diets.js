import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tabs, Table, Space, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { map } from 'jquery';
const { confirm } = Modal;
import '../setting/axiosSetting';

class Diets extends Component {
    state = {
        flag: 0,
        diets: [],
        resultCode: 0,
        selectedRowKeys: [],
        loading: false,
    }

    columns = [
        {
            title: 'Name',
            dataIndex: "dietName",
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/dietupdate/" + record.dietId}> <div>{text}</div> </Link>
                </Space>
            ),
        },
        {
            title: 'Calculated ME, kcal/kg',
            dataIndex: "kcalPerKg",
            sorter: {
                compare: (a, b) => a.kcalPerKg - b.kcalPerKg,
                multiple: 1,
            },
        },
        {
            title: 'Calculated ME, kcal/cup',
            dataIndex: "kcalPerCup",
            sorter: {
                compare: (a, b) => a.kcalPerCup - b.kcalPerCup,
                multiple: 2,
            },
        },
        {
            title: 'Price',
            dataIndex: "compositePrice",
            sorter: {
                compare: (a, b) => a.compositePrice - b.compositePrice,
                multiple: 3,
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined style={{ margin: '0 8px' }}
                        onClick={() => {
                            window.location.replace("/dietupdate/" + record.dietId);
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
                                            axios.delete("http://localhost:8081/formula/delete/diet/" + record.dietId)
                                                .then(resJson => {
                                                    console.log(resJson.data.data);
                                                    //message.info('Deleted!');
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

    componentDidMount() {
        this.getDiets();
    }

    getDiets = () => {
        axios.get("http://localhost:8081/user/get_diet_user/")
            .then(resJson => {
                console.log(resJson)
                resJson.data.map((diet) => { diet.key = diet.dietId })
                this.setState({
                    diets: resJson.data.data,
                    resultCode: resJson.data.resultCode,
                    flag: 1
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    multipleDeletion = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length > 0) {
            confirm({
                title: `确定批量删除该 ${selectedRowKeys.length} 项食谱吗？`,
                icon: <ExclamationCircleOutlined />,
                content: ``,
                onOk() {
                    return new Promise((resolve, reject) => {
                        selectedRowKeys.map(key => {
                            axios.delete("http://localhost:8081/formula/delete/diet/" + key)
                                .then(resJson => {
                                    console.log(resJson.data.data);
                                    window.location.reload();
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                    })
                },
                onCancel() {},
            })
        } else {
            confirm({
                title: `请选择要删除的食谱`,
                icon: <ExclamationCircleOutlined />,
                content: ``,
                onCancel() {},
            })
        }

        /* this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000); */
    };

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        if (this.state.flag === 0) {
            return (
                <h1>test</h1>
            )
        }
        else {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All diets</h1>
                    <p class="mb-4">Here are all diets in database.</p>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Button type="primary" href="/dietcreate">
                                Create new diet
                        </Button>
                            <Button type="primary" onClick={this.multipleDeletion} danger>
                                Delete selected
                        </Button>
                        </Space>
                    </div>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.diets}
                        pagination={{ position: ["bottomCenter"] }}
                        rowSelection={rowSelection}
                    />
                </div>
            )
        }
    }
}
export default Diets;