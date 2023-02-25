import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';

const FormItem = Form.Item;
const { TextArea } = Input;

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tag: ''
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = e => {
    e.preventDefault();
    this.props.createPost({ ...this.state, likes: 0 });
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div className="pure-g Post">
        <div className="pure-u-8-24" />
        <div className="pure-u-8-24">
          <Form onSubmit={this.createPost} className="CreatPost">
            <FormItem>
              <Input
                name="title"
                onChange={this.handleOnChange}
                value={this.state.title}
                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Post Tile"
              />
            </FormItem>
            <FormItem>
              <TextArea
                name="body"
                onChange={this.handleOnChange}
                value={this.state.body}
                rows={4}
                placeholder="Post Content"
              />
            </FormItem>
            <Button
              onClick={this.createPost}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create Post
            </Button>
          </Form>
        </div>
        <div className="pure-u-8-24" />
      </div>
    );
  }
}

export default CreatePost;
