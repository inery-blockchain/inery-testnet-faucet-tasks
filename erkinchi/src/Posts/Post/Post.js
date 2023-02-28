import React, { Component } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import EditPost from '../EditPost/EditPost';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      liked: false,
      post: {
        title: this.props.post.title,
        body: this.props.post.body,
        likes: this.props.post.likes
      }
    };

    console.log(this.props.post);
  }

  savePost = (post, e) => {
    const updatePost = Object.assign(this.props.post, post);
    this.props.editPost(updatePost, e);
    this.setState(prevState => ({
      editing: !prevState.editing,
      post
    }));
  };

  render() {
    const editing = this.state.editing;
    return (
      <div>
        {!editing ? (
          <div className="pure-g Post">
            <div className="pure-u-4-24" />
            <div className="pure-u-16-24">
              <Card
                title={this.state.post.title}
                actions={[
                  <DeleteOutlined
                    onClick={e => {
                      this.props.deletePost(this.props.post.id, e);
                    }}
                    style={{ color: '#f5222d' }}
                  />,


                  <EditOutlined
                    onClick={e => {
                      this.setState(prevState => ({
                        editing: !prevState.editing
                      }));
                    }}
                    style={{ color: '#13c2c2' }}
                  />,
                  <div onClick={e => {
                      this.setState(prevState => ({
                        liked: !prevState.liked,
                        post: Object.assign(prevState.post, {
                          likes: prevState.liked ? prevState.post.likes : prevState.post.likes + 1
                        })
                      }));
                      this.props.likePost(this.props.post.id, e);
                    }}>
                    {this.state.liked ? <HeartFilled style={{ color: '#eb2f96' }} /> : <HeartOutlined style={{ color: '#eb2f96' }} />}
                  </div>
                ]}
              >
                <p>{this.state.post.body}</p>
                <p>Likes: {this.state.post.likes}</p>
              </Card>
            </div>
            <div className="pure-u-4-24" />
          </div>
        ) : (
          <EditPost savePost={this.savePost} post={this.props.post} />
        )}
      </div>
    );
  }
}

export default Post;
