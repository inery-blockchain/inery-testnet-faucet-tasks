import React, { Component } from 'react';
import { Card, Form, Input } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { TextArea } = Input;

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: this.props.post.title,
        body: this.props.post.body,
      }
    };
  }

  handleOnChange = e => {
    let post = Object.assign({}, this.state.post);
    post[e.target.name] = e.target.value;
    this.setState({ post });
  };

  render() {
    return (
      <div className="pure-g EditPost">
        <div className="pure-u-4-24" />
        <div className="pure-u-16-24">
          <Form className="EditPost">
            <Card
              actions={[
                <SaveOutlined
                  onClick={e => {
                    this.props.savePost(this.state.post, e);
                  }}
                  style={{ color: '#13c2c2' }}
                />
              ]}
            >
              <FormItem>
                <Input
                  name="title"
                  onChange={this.handleOnChange}
                  value={this.state.post.title}
                  prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Title"
                />
              </FormItem>
              <FormItem>
                <TextArea
                  name="body"
                  onChange={this.handleOnChange}
                  value={this.state.post.body}
                  rows={4}
                  placeholder="body"
                />
              </FormItem>
            </Card>
          </Form>
        </div>
        <div className="pure-u-4-24" />
      </div>
    );
  }
}

export default EditPost;
