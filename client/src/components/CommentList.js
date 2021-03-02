import React from 'react';
import axios from 'axios';
import moment from 'moment';

class CommentList  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: '',
      comments: null,

    }
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  handleCommentSubmit(event) {
    event.preventDefault();
    let _this = this;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comment`, {
      text: this.state.commentText,
      postId: this.props.postId,
      userId: this.props.userId

    })
      .then(function (response) {
        let new_comments = _this.state.comments;
        new_comments.push(response.data);
        _this.setState({comments: new_comments, commentText: ''});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleCommentInput(event) {
    this.setState({
      commentText: event.target.value
    });


  }

  componentDidMount() {
    let _this = this;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${this.props.postId}/comments`)
      .then(function (response) {
        // console.log('comments: ', response.data)
        _this.setState({
          comments: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (

      <div>
        <div style = {{width: '100%'}}>
          {/* ternary */}
          {this.state.comments ? // ? is true
            <div>
              <h3 style = {{textAlign: 'left'}}>Comments</h3>
            <ul className="list-group list-group-flush">
              {this.state.comments.map(function (comment) {
                //console.log(comment);
                return (
                  <li className="list-group-item" style = {{textAlign: 'left'}} key={comment._id}>
                    <span style = {{color:'#4968AC',fontWeight:'600'}}>{comment.user.firstname} {comment.user.lastname} </span>- {moment(comment.createdAt).format('MMMM Do YYYY')}
                    <p>{comment.text}</p>
                  </li>
                )
              })}
            </ul>
            </div>
            : // : is false
            <p>Loading comments, pleast wait...</p>
          }

        </div>
        <form onSubmit={this.handleCommentSubmit} className="clearfix">

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Post a comment</label>
            <textarea onChange={this.handleCommentInput} value={this.state.commentText} className="form-control" id="exampleFormControlTextarea2" rows={3} />
          </div>
          <button type="submit" className="btn btn-secondary float-right">Post Comment</button>

        </form>
        
      </div>
    )
  }
}

export default CommentList;