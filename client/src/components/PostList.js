import React from 'react';
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        img: ''
    };
};
  


render() {
  
  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

    let base64Flag = 'data:image/jpeg;base64,';
    let _this = this;
    
    return (
      <div>
        {/* ternary */}
        {this.props.posts ? // ? is true
          <ul className="list-group-item p-4">
            {this.props.posts.map(function (postItem) {
              var imageStr = arrayBufferToBase64(postItem.image.data.data);
              return (
                <li className="list-group-item" key={postItem._id}>
                  <Post refreshTimeline={_this.props.refreshTimeline} post={postItem}
                          user={_this.props.user}
                         source = {base64Flag + imageStr}
                          />
            

                </li>
              )
            })}
          </ul>
          : // : is false
          <p>Loading posts, please wait...</p>
        }
      </div>
    )
  }
}

export default PostList;