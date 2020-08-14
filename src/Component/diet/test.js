import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, {Component} from 'react';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

class Test extends Component{
    state = {
        recipes:['ascx', 'asc', 'dfs'],
    }

    render(){
        const onFinish = values => {
            console.log('Received values of form:', values);
          };
          return (
            <div>
            <h3>recipe</h3>
            <Form name="dynamic_form_item" onFinish={onFinish}>
              <Form.List name="recipeID">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...(formItemLayout)}
                          label=''
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            noStyle
                          >
                            <select class="custom-select" name="breedName" id="breedName" style={{ width: '60%' }}>
                                {this.state.recipes.map(recipe => {
                                    return(
                                        <option value={recipe}>{recipe}</option>
                                    );
                                })}
                            </select>
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              style={{ margin: '0 8px' }}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          style={{ width: '60%' }}
                        >
                          <PlusOutlined /> Add field
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
        
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </div>
          );
    }
}
export default Test;
