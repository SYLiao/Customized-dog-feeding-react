import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { Form, Input, Button, Card, Row, Space, Divider, PageHeader, Option, Select, Descriptions, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import $ from 'jquery';
import axios from 'axios';

class RecipesUpdate extends Component {
  state = {
    recipe: {},
    ingredientsByType: {},
    recipeId: this.props.match.params.id,
  }

  async componentDidMount() {
    try {
      await this.getRecipe();
      await this.getIngredients();
    } catch (err) {
      alert(err);
    }
  }

  handleInputChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  getRecipe() {
    console.log(this.state.recipeId);
    axios.get("http://localhost:8081/formula/get/recipe/" + this.state.recipeId)
      .then(resJson => {
        this.setState({
          recipe: resJson.data.data,
        });
        console.log(resJson.data.data);

      })
      .catch(error => {
        console.log(error);
      });
  };

  getIngredients() {
    axios.get("http://localhost:8081/formula/get/all_ingredient_by_recipe/" + this.state.recipeId)
      .then(resJson => {
        this.setState({
          ingredientsByType: resJson.data.data.ingredientsByType,
        });
        console.log(resJson.data.data);

      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const onFinish = values => {
      console.log(this.state.name);
      console.log('Received values of form:', values);
    };

    const { Option } = Select;

    return (
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <Topbar></Topbar>
          <div class="container-fluid">
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Update Recipe"
                subTitle="view and edit saved recipe"
                extra={[
                  <Button>Edit</Button>,
                  <Button type="primary"> Submit</Button>,
                ]}
              >
              </PageHeader>
            </div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800"></h1>
            </div>

            <Form name="dynamic_form_item" onFinish={onFinish}>

              <Row gutter={[8, 16]}>
                <div style={{ marginBottom: 8, marginLeft: 8, width: "100%" }}>
                  <Space direction="vertical" span={24}>
                    <Input addonBefore="Your recipe's name:" defaultValue="recipe's name" type="text" name="recipeName"
                      value={this.state.recipe.name} onChange={this.handleInputChange} style={{ width: '345%' }} span={24} />

                  </Space>
                </div>

              </Row>
            </Form>

            <Row span={24}>
              <Space direction="horizonal">
                <Card title="营养成分" bordered={false} >
                  <Descriptions
                    bordered
                    size="small"
                    span={24}
                  >
                    {
                      Object.entries(this.state.recipe).map(([field, value]) => {
                        if (!["name", "price", "id", "recipeType"].includes(field)) {
                          return (
                            <Descriptions.Item label={field}>{value}</Descriptions.Item>
                          )
                        }
                      }
                      )}
                  </Descriptions>
                </Card>
                <Col span={24}>
                  {
                    <Col span={24}>
                      <Card title="食谱原料" bordered={false}>
                        {
                          Object.entries(this.state.ingredientsByType).map(([type, ingredients]) => {
                            var gridStyle = {
                              width: '100%',
                              textAlign: 'center',
                            };
                            return (
                              <Card.Grid hoverable={false} style={gridStyle}>
                                <p>{type}</p>
                                {ingredients.map((ingredient, index) => {
                                  return (
                                    <Descriptions layout="vertical" bordered>
                                      <Descriptions.Item label="Recipe">{ingredient.ingredient.name}</Descriptions.Item>
                                  <Descriptions.Item label="Ratio">{ingredient.ingredientRatio}</Descriptions.Item>
                                    </Descriptions>
                                  );
                                })}
                              </Card.Grid>
                            )
                          })
                        }
                      </Card>
                    </Col>
                  }
                </Col>
              </Space>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default RecipesUpdate;