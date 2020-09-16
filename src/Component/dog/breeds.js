import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as Action from "../store/Actions";
import { Modal, Tabs, Table, Space, Spin, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../setting/axiosSetting';

const { confirm } = Modal;

class Breeds extends Component {
    state = {
        flag: 0,
        dogs: [],
        resultCode: 0,
        selectedRowKeys: [],
        loading: false,
    }

    columns = [
        {
            title: 'Name',
            dataIndex: "breedName",
            // render: (text, record) => (
            //     <Space size="middle">
            //         <Link to={"/dogupdate/" + record.dogId}> <div>{text}</div> </Link>
            //     </Space>
            // ),
        },
        {
            title: '成年雄性平均体重',
            dataIndex: "adultMaleWeightAverage",
            sorter: {
                compare: (a, b) => a.adultMaleWeightAverage - b.adultMaleWeightAverage,
                multiple: 1,
            },
        },
        {
            title: '成年雌性平均体重',
            dataIndex: "adultFemaleWeightAverage",
            sorter: {
                compare: (a, b) => a.adultFemaleWeightAverage - b.adultFemaleWeightAverage,
                multiple: 2,
            },
        },
        {
            title: '雄性最大身高',
            dataIndex: "maleHeightMax",
            sorter: {
                compare: (a, b) => a.maleHeightMax - b.maleHeightMax,
                multiple: 3,
            },
        },
        {
            title: '雌性最大身高',
            dataIndex: "maleHeightMin",
            sorter: {
                compare: (a, b) => a.maleHeightMin - b.maleHeightMin,
                multiple: 4,
            },
        },
        {
            title: '受欢迎度排行',
            dataIndex: "popularityRank",
            sorter: {
                compare: (a, b) => a.popularityRank - b.popularityRank,
                multiple: 5,
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined style={{ margin: '0 8px' }}
                        onClick={() => {
                            window.location.replace("/dogupdate/" + record.dogId);
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
                                            axios.delete("http://localhost:8081/mer/admin/delete/breed/" + record.breedId)
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

    componentDidMount() {
        this.getDogs();
    }

    getDogs = () => {
        axios.get("http://localhost:8081/mer/customer/get/all_breed")
            .then(resJson => {
                console.log(resJson)
                resJson.data.data.map((breed) => { breed.key = breed.breedId })
                this.setState({
                    dogs: resJson.data.data,
                    resultCode: resJson.data.resultCode,
                    flag: 1
                })
                console.log(this.state.dogs)
            })
            .catch(error => {
                console.log(error)
            });
    }

    multipleDeletion = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length > 0) {
            confirm({
                title: `确定批量删除该 ${selectedRowKeys.length} 项breeds吗？`,
                icon: <ExclamationCircleOutlined />,
                content: ``,
                onOk() {
                    return new Promise((resolve, reject) => {
                        selectedRowKeys.map(key => {
                            axios.delete("http://localhost:8081/mer/admin/delete/breed/" + key)
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
                onCancel() { },
            })
        } else {
            confirm({
                title: `请选择要删除的breed`,
                icon: <ExclamationCircleOutlined />,
                content: ``,
                onCancel() { },
            })
        }
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
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All 🐕</h1>
                    <p class="mb-4">Here are all 🐕 in database.</p>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Button type="primary" href="/dogcreate">
                                Create new 🐕
                        </Button>
                            <Button type="primary" onClick={this.multipleDeletion} danger>
                                Delete selected 🐕
                        </Button>
                        </Space>
                    </div>
                    <Spin tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={this.state.dogs}
                            pagination={{ position: ["bottomCenter"] }}
                            rowSelection={rowSelection}
                        />
                    </Spin>

                </div>
            )
        }
        else {
            return (
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">All Breeds</h1>
                    <p class="mb-4">Here are all Breeds in database.</p>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Button type="primary" href="/dogcreate">
                                Create new Breed
                        </Button>
                            <Button type="primary" onClick={this.multipleDeletion} danger>
                                Delete selected Breeds
                        </Button>
                        </Space>
                    </div>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.dogs}
                        pagination={{ position: ["bottomCenter"] }}
                        rowSelection={rowSelection}
                    />
                </div>
            )
        }
        /* return(
        <div class="container-fluid"> 
            <h1 class="h3 mb-2 text-gray-800">All dogs</h1>
            <p class="mb-4">Here are all dogs in database.</p>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>age</th>
                        <th>feedingFrequency</th>
                        <th>gender</th>
                        <th>merModelEveryDay</th>
                        <th>treatFrequency</th>
                        <th>weight</th>
                        <th>breed</th>
                        <th><Link to="/dogcreate">create new dog</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dogs.map(dog => {
                            console.log(dog)
                            return(
                                <tr>
                                <td> <Link to={"/dogupdate/" + dog.dogId}> <div>{dog.name}</div> </Link></td>
                                <td>{dog.age}</td>
                                <td>{dog.feedingFrequency}</td>
                                <td>{dog.gender}</td>
                                <td>{dog.merModelEveryDay}</td>
                                <td>{dog.treatFrequency}</td>
                                <td>{dog.weight}</td>
                                <td>{dog.breedName}</td>
                                <td></td>
                                </tr>
                            )
                        })}   
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    ) */
    }
}
export default Breeds;